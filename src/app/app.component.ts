import { Component, OnInit } from '@angular/core';
import { DeckService } from './services/deck.service';
import { Deck } from './deck/deck.class';
import { Card } from './card/card.class';
import { Draw } from './draw/draw.class';
import { Observable } from '../../node_modules/rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DeckService ]

})

export class AppComponent implements OnInit {
  constructor(public deckService: DeckService) {}

  picked: Card;
  cardPick1: Card;
  cardPick2: Card;
  totalPicked = 0;
  backOfCard = 'https://opengameart.org/sites/default/files/card%20back%20black.png';
  matches = 0;
  public draw$: Observable<Draw>;
  private deck: Deck;

  ngOnInit(): void {
    this.deckService.getDeckResponse().subscribe(deck => {
      this.deck = deck;
    });
  }

  newGame () {
    this.draw$ = this.deckService.getDrawResponse(this.deck.deck_id);
  }

  pickCard(picked) {
    this.totalPicked++;
    if (this.totalPicked >= 3) {
      alert('Slow down! You pick too fast!');
      this.reset(this.cardPick1, this.cardPick2);
      picked = '';
      this.totalPicked = 0;
      return;
    }
    if ( this.cardPick1 == null) { // set first card picked
      this.cardPick1 = picked;
      this.reveal(this.cardPick1);
    } else if (this.cardPick1.code === picked.code) { // can't pick the same card
        this.totalPicked--;
        return;
    } else {
        this.cardPick2 = picked; // set second card picked
        this.reveal(this.cardPick2);
      }

    if (this.totalPicked === 2) {
      if (this.cardPick1.value === this.cardPick2.value ) { // Match
        setTimeout(() => {
          this.match(this.cardPick1, this.cardPick2);
          this.cardPick1 = null;
          this.cardPick2 = null;
          this.totalPicked = 0;
        }, 400);
      } else {
        setTimeout(() => {
          this.reset(this.cardPick1, this.cardPick2); // Not a match
          this.cardPick1 = null;
          this.cardPick2 = null;
          this.totalPicked = 0;
        }, 700);
      }
    }
    return;
  }

  // show the card face
  reveal(showCard: Card) {
    const flip = document.getElementById(showCard.code).getElementsByTagName( 'img' )[0];
     flip.src = showCard.image;
  }

  // remove the matched cards from the board
  match(card1: Card, card2: Card) {
    this.matches++;
    let remove = document.getElementById(card1.code);
    remove.style.visibility = 'hidden';
    remove = document.getElementById(card2.code);
    remove.style.visibility = 'hidden';
    if (this.matches >= 26) {
      alert('YOU WIN!!!');
    }
  }

  // Turn picked cards back over
  reset(cardA: Card, cardB: Card) {
    let flipBack = document.getElementById(cardA.code).getElementsByTagName( 'img' )[0];
    flipBack.src = this.backOfCard;
    flipBack = document.getElementById(cardB.code).getElementsByTagName( 'img' )[0];
    flipBack.src = this.backOfCard;
  }
}
