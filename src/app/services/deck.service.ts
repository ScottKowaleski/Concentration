import { Injectable } from '@angular/core';
import { Deck } from '../deck/deck.class';
import { Draw } from '../draw/draw.class';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DeckService {
    constructor(private http: HttpClient) { }

    getDeckResponse(): Observable<Deck> {
        return this.http.get<Deck>('https://deckofcardsapi.com/api/deck/new/shuffle/');
    }

    getDrawResponse(d_Id): Observable<Draw> {
        return this.http.get<Draw>(`https://deckofcardsapi.com/api/deck/${d_Id}/draw/?count=52`);
    }
}
