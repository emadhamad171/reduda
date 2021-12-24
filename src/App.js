import {useState, useEffect} from "react";
import _ from "lodash";
import {computeMove, checkWin} from "./lib/game";
import PlayerSetup from "./components/PlayerSetup";
import Field from "./components/Field";
import Deck from "card-deck";
import {deck} from "./data/Player";
import gif from './shuffle.gif'
import card from "deck-of-cards/lib/card";
import Card from "./components/Card";

let myDeck = new Deck(deck);
let outOfTheGameDeck = new Deck([]);
export const initialState = {
    winner: false,
    started: false,
    turn: null,
    players: [],
    generalDeck: 32,
    deck: myDeck.shuffle(),
    generalTrump: myDeck.draw(),
    droppedCards: {bot: [], player: []},
    outOfTheGameDeck: outOfTheGameDeck,
    newRound: true



};

function App() {

    const [state, setState] = useState(initialState);
    useEffect(() => {
        console.log('oh turn changed', state?.players[state.turn]?.type);
        if (
            !state.winner &&
            state.started &&
            state.players[state.turn].type === "bot"
        ) {
            console.log('bot is moving');
            botMove();
        }
    }, [state.turn, state.newRound]);



    function botMove() {
        console.log('bot move function desicion',state.players[state.turn]);
        const card = state.players[state.turn].makeDecision(
            _.cloneDeep(state)
        );
        console.log(card);
        putCard(card);
    }

    function putCard(card) {
        console.log('we are in pur');
        setState((prevState) => {
            const newState = computeMove(_.cloneDeep(prevState), card);
            console.log(newState);
            const [won, winner] = checkWin(newState);
            console.log('out of win ');
            return {...prevState, ...newState, winner: won ? winner : false};
        });
    }

    function startGame() {
        if (state.players.length !== 2) {
            console.log("You need to choose type of the players!");
            return;
        }
        setState((p) => ({...p, started: true, turn: 0}));
    }


    function restartGame() {
        setState(_.cloneDeep(initialState));
    }
    const drawOutOfGameCards = () => {

    }
    return (
        <div>
            {!state.started || state.winner ? (
                <div id="panel">
                   <img src={gif} className='gif' alt=""/>

                    {!state.started && !state.winner ? (
                        <div className="select">
                            <PlayerSetup state={state} setState={setState} index={0}/>
                            <PlayerSetup state={state} setState={setState} index={1}/>
                        </div>
                    ) : (
                        ""
                    )}
                    {state.winner && (
                        <button onClick={() => restartGame()} className="m-auto btn">
                            New game
                        </button>
                    )}
                    {!state.started && state.players.length === 2 && (
                        <button onClick={() => startGame()} className="m-auto btn">
                            Start
                        </button>
                    )}
                </div>
            ) : (
                ""
            )}
            {state.winner ? <h3>Game over, Player {state.winner.name} won!</h3> : ""}
            {!state.started ? <h2>Choose players and press Start</h2> : ""}
            <div className='field-container'>
                <div className='field-wrapper'>
                    <Field state={state} putCard={putCard}/>
                </div>
                {state.started &&
                    <div>
                        <div className='general-trump-deck'>
                            <span>General trump</span>
                            <span className={`card ${state.generalTrump.color}`}>{state.generalTrump.symbol} </span>
                            <span>{ <Card card={state.outOfTheGameDeck?.draw()}/> }</span>
                        </div>
                    </div>
                }
            </div>
            {state.started && !state.winner && (
                <button
                    style={{marginTop: "0.5rem"}}
                    onClick={() => restartGame()}
                    className="btn m-auto"
                >
                    Reset game

                </button>

            )}
        </div>
    );
}

export default App;
