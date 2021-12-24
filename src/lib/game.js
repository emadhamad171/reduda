import _ from 'lodash';

export function computeMove(state, card) {
    const userWhoMovesType = state.players[state.turn].type
    // let isMovingAgain = false;

    console.log(state.droppedCards, 'dsfsdfsdfsdfsdfsdf', userWhoMovesType, card, state.droppedCards?.player[0]?.value, state.newRound);
    if (state.newRound) {
        if (state.generalDeck >= 2 ){
            console.log(state);
            if (state.players[0].cards._stack.length < 7){
                state.players[0].cards._stack.push(state.players[0].trumpDeck.draw(1))

            }if (state.players[1].cards._stack.length < 7){
                state.players[1].cards._stack.push(state.players[1].trumpDeck.draw(1))
            }
        }
        console.log(state);
        state.droppedCards.bot = []
        state.droppedCards.player = []
        state.droppedCards[userWhoMovesType].push(card)
        state.outOfTheGameDeck._stack.push(card)
        state.players[state.turn].cards.drawWhere((c) => {
            return card.value === c.value && card.suit === c.suit
        }, 1)
        state.turn === 0 ? state.turn = 1 : state.turn = 0
        state.newRound = false

    } else {
        switch (userWhoMovesType) {
            case 'bot':
                console.log('bot');
                if (state.droppedCards.player[0].value < card.value) {
                    state.droppedCards.bot.push(card)
                    state.outOfTheGameDeck._stack.push(card)
                    console.log(state.players);
                    state.players[1].cards.drawWhere((c) => {
                        return card.value === c.value && card.suit === c.suit
                    }, 1)
                } else {
                        state.players[1].cards._stack.push(state.players[1].trumpDeck.draw(1))
                    state.turn = 0
                    state.newRound = true
                    console.log('we aould like to through erro ');
                    break
                }
                state.turn = 1
                state.newRound = true

                break
            case 'player':
                console.log('player', state);
                if (state.droppedCards.bot[0].value < card.value && card.suit === state.droppedCards.bot[0].suit ) {
                    console.log('we are inside player case');
                    state.droppedCards.player.push(card)
                    state.outOfTheGameDeck._stack.push(card)
                    state.players[0].cards.drawWhere((c) => {
                        return card.value === c.value && card.suit === c.suit
                    }, 1)
                } else {
                    if (state.players[0].cards._stack.length < 7){
                        state.players[0].cards._stack.push(state.players[0].trumpDeck.draw(1))

                    }
                    state.turn = 1
                    state.newRound = true
                    console.log('we aould like to through erro ');
                    break
                    // throw new Error('you cant use this card')
                }
                state.turn = 0
                state.newRound = true

                break
            default:
                console.log('asdasdasd');
                break;
        }
        state.droppedCards[userWhoMovesType] = [card]
    }

    return state;
}

export function checkWin(state) {
    for (const player of state.players) {
        if (player.cards.length === 0 && player.trumpDeck.length === 0 && state.generalDeck.length === 0) {
            return [true, state.players[state.turn].type]
        }
    }
    return [false, null];
}