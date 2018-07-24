"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var deck_service_1 = require("./services/deck.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(deckService) {
        this.deckService = deckService;
        this.deckId = '';
        this.totalPicked = 0;
        this.backOfCard = 'https://opengameart.org/sites/default/files/card%20back%20black.png';
        this.matches = 0;
        this.title = 'Concentration';
    }
    AppComponent.prototype.DeckResponse = function () {
        var _this = this;
        this.deckService.getDeckResponse()
            .subscribe(function (resp) {
            _this.deck = __assign({}, resp.body);
        });
    };
    AppComponent.prototype.DrawResponse = function () {
        var _this = this;
        this.deckService.getDrawResponse(this.deckId)
            .subscribe(function (resp) {
            _this.draw = __assign({}, resp.body);
        });
    };
    AppComponent.prototype.newGame = function () {
        var _this = this;
        this.matches = 0;
        this.DeckResponse();
        setTimeout(function () {
            _this.deckId = _this.deck.deck_id;
        }, 200);
        setTimeout(function () {
            _this.DrawResponse();
            setTimeout(function () {
                _this.cards = _this.draw.cards;
            }, 400);
        }, 400);
    };
    AppComponent.prototype.pickCard = function (picked) {
        var _this = this;
        this.totalPicked++;
        if (this.totalPicked >= 3) {
            alert('Slow down! You pick too fast!');
            this.reset(this.cardPick1, this.cardPick2);
            picked = '';
            this.totalPicked = 0;
            return;
        }
        if (this.cardPick1 == null) {
            this.cardPick1 = picked;
            this.reveal(this.cardPick1);
        }
        else if (this.cardPick1.code === picked.code) {
            this.totalPicked--;
            return;
        }
        else {
            this.cardPick2 = picked; // set second card picked
            this.reveal(this.cardPick2);
        }
        if (this.totalPicked === 2) {
            if (this.cardPick1.value === this.cardPick2.value) {
                setTimeout(function () {
                    _this.match(_this.cardPick1, _this.cardPick2);
                    _this.cardPick1 = null;
                    _this.cardPick2 = null;
                    _this.totalPicked = 0;
                }, 400);
            }
            else {
                setTimeout(function () {
                    _this.reset(_this.cardPick1, _this.cardPick2); // Not a match
                    _this.cardPick1 = null;
                    _this.cardPick2 = null;
                    _this.totalPicked = 0;
                }, 700);
            }
        }
        return;
    };
    // show the card face
    AppComponent.prototype.reveal = function (showCard) {
        var flip = document.getElementById(showCard.code).getElementsByTagName('img')[0];
        flip.src = showCard.image;
    };
    // remove the matched cards from the board
    AppComponent.prototype.match = function (card1, card2) {
        this.matches++;
        var remove = document.getElementById(card1.code);
        remove.style.visibility = 'hidden';
        remove = document.getElementById(card2.code);
        remove.style.visibility = 'hidden';
        if (this.matches >= 26) {
            alert('YOU WIN!!!');
        }
    };
    // Turn picked cards back over
    AppComponent.prototype.reset = function (cardA, cardB) {
        var flipBack = document.getElementById(cardA.code).getElementsByTagName('img')[0];
        flipBack.src = this.backOfCard;
        flipBack = document.getElementById(cardB.code).getElementsByTagName('img')[0];
        flipBack.src = this.backOfCard;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [deck_service_1.DeckService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map