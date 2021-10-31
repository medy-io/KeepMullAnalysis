// interfaces
import { CardObject, PercentByCardType } from "./interfaces.ts";
// user defined input
import { userDeckList } from "./userDeckList.ts";
// fetch deck data
import { fetchDeckData } from "./fetchDeckData.ts";
import { calculateEachCardDrawPercentage } from "./calculateEachCardDrawPercentage.ts";
import { assignAmountOfSiblingCardsInDeck } from "./assignAmountOfSiblingCardsInDeck.ts";
import { createOpeningHandData } from "./createOpeningHandData.ts";
import { analyzeData } from "./analyzeData.ts";
import { iterationLimit } from "./iterationLimit.ts";
import { generateOpeningHand } from "./generateOpeningHand.ts";

let deck: CardObject[] = [];
let hand: CardObject[] = [];
let downloadData: any[] = [];

// fetch deck data
deck = await fetchDeckData(userDeckList);
generateFullDataSet();
analyzeData(downloadData);
console.log("DONE!");


function generateFullDataSet() {
  for (let i = 0; i < iterationLimit; i++) {
    let list: string = "";
    let cardType: string = "";
    generateOpeningHand(deck, hand);
    for (let index: number = 0;index < hand.length;index++) {
      list = list + hand[index].name + "  ";
      cardType = cardType + hand[index].type_line + "|";
    }
    downloadData.push({list: list, type: cardType});
    resetSim(deck, hand, list);
  }
}

function resetSim(deck: any, hand: any, list: any): void {
    if (hand && hand.length > 0) {
      deck = deck.concat(hand);
      hand = [];
    }
  }