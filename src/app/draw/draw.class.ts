import { Card } from '../card/card.class';

export interface Draw {
    success: boolean;
    cards: Card[];
    deck_id: string;
    remaining: number;
}
