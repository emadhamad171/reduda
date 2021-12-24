import {minimaxWithPrunning} from "../lib/ai";

export default class Player {
    constructor(index, name, playerType = 'player', userTrump, userCards, userTrumpDeck) {
        this.name = name;
        this.cards = userCards;
        this.type = playerType;
        this.lvl = 1;
        this.index = index;
        this.userTrump = userTrump
        this.trumpDeck = userTrumpDeck
    }

    getField() {
        return this.cards;
    }

    makeDecision(state) {
        return minimaxWithPrunning(-Infinity, Infinity, 0, true, state, this.lvl, this.index);
    }
}
export const deck = [
    {symbol: '🂡', suit: 'spades', color: 'black', value: 14},
    {symbol: '🂱', suit: 'hearts', color: 'red', value: 14},
    {symbol: '🃁', suit: 'diamonds', color: 'red', value: 14},
    {symbol: '🃑', suit: 'clubs', color: 'black', value: 14},
    {symbol: '🂢', suit: 'spades', color: 'black', value: 2},
    {symbol: '🂲', suit: 'hearts', color: 'red', value: 2},
    {symbol: '🃂', suit: 'diamonds', color: 'red', value: 2},
    {symbol: '🃒', suit: 'clubs', color: 'black', value: 2},
    {symbol: '🂣', suit: 'spades', color: 'black', value: 3},
    {symbol: '🂳', suit: 'hearts', color: 'red', value: 3},
    {symbol: '🃃', suit: 'diamonds', color: 'red', value: 3},
    {symbol: '🃓', suit: 'clubs', color: 'black', value: 3},
    {symbol: '🂤', suit: 'spades', color: 'black', value: 4},
    {symbol: '🂴', suit: 'hearts', color: 'red', value: 4},
    {symbol: '🃄', suit: 'diamonds', color: 'red', value: 4},
    {symbol: '🃔', suit: 'clubs', color: 'black', value: 4},
    {symbol: '🂥', suit: 'spades', color: 'black', value: 5},
    {symbol: '🂵', suit: 'hearts', color: 'red', value: 5},
    {symbol: '🃅', suit: 'diamonds', color: 'red', value: 5},
    {symbol: '🃕', suit: 'clubs', color: 'black', value: 5},
    {symbol: '🂦', suit: 'spades', color: 'black', value: 6},
    {symbol: '🂶', suit: 'hearts', color: 'red', value: 6},
    {symbol: '🃆', suit: 'diamonds', color: 'red', value: 6},
    {symbol: '🃖', suit: 'clubs', color: 'black', value: 6},
    {symbol: '🂧', suit: 'spades', color: 'black', value: 7},
    {symbol: '🂷', suit: 'hearts', color: 'red', value: 7},
    {symbol: '🃇', suit: 'diamonds', color: 'red', value: 7},
    {symbol: '🃗', suit: 'clubs', color: 'black', value: 7},
    {symbol: '🂨', suit: 'spades', color: 'black', value: 8},
    {symbol: '🂸', suit: 'hearts', color: 'red', value: 8},
    {symbol: '🃈', suit: 'diamonds', color: 'red', value: 8},
    {symbol: '🃘', suit: 'clubs', color: 'black', value: 8},
    {symbol: '🂩', suit: 'spades', color: 'black', value: 9},
    {symbol: '🂹', suit: 'hearts', color: 'red', value: 9},
    {symbol: '🃉', suit: 'diamonds', color: 'red', value: 9},
    {symbol: '🃙', suit: 'clubs', color: 'black', value: 9},
    {symbol: '🂪', suit: 'spades', color: 'black', value: 10},
    {symbol: '🂺', suit: 'hearts', color: 'red', value: 10},
    {symbol: '🃊', suit: 'diamonds', color: 'red', value: 10},
    {symbol: '🃚', suit: 'clubs', color: 'black', value: 10},
    {symbol: '🂫', suit: 'spades', color: 'black', value: 11},
    {symbol: '🂻', suit: 'hearts', color: 'red', value: 11},
    {symbol: '🃋', suit: 'diamonds', color: 'red', value: 11},
    {symbol: '🃛', suit: 'clubs', color: 'black', value: 11},
    {symbol: '🂭', suit: 'spades', color: 'black', value: 12},
    {symbol: '🂽', suit: 'hearts', color: 'red', value: 12},
    {symbol: '🃍', suit: 'diamonds', color: 'red', value: 12},
    {symbol: '🃝', suit: 'clubs', color: 'black', value: 12},
    {symbol: '🂮', suit: 'spades', color: 'black', value: 13},
    {symbol: '🂾', suit: 'hearts', color: 'red', value: 13},
    {symbol: '🃎', suit: 'diamonds', color: 'red', value: 13},
    {symbol: '🃞', suit: 'clubs', color: 'black', value: 13},
    {symbol: '🂿', suit: 'w', color: 'black', value: 15},
    {symbol: '🂿', suit: 'w', color: 'black', value: 15},
    {symbol: '🃏', suit: 'w', color: 'red', value: 16},
]