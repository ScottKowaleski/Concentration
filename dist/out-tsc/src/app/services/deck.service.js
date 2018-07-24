"use strict";
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
var http_1 = require("@angular/common/http");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var DeckService = /** @class */ (function () {
    function DeckService(http) {
        this.http = http;
        this.deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
        this.cardUrl = 'https://deckofcardsapi.com/api/deck/<deck_id>/draw/?count=52';
    }
    DeckService.prototype.getDeckResponse = function () {
        return this.http.get(this.deckUrl, { observe: 'response' });
    };
    DeckService.prototype.getDrawResponse = function (d_Id) {
        var url = this.cardUrl.replace('<deck_id>', d_Id);
        return this.http.get(url, { observe: 'response' });
    };
    DeckService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DeckService);
    return DeckService;
}());
exports.DeckService = DeckService;
//# sourceMappingURL=deck.service.js.map