import React from "react";
import Card from "./Card";

export default function Field({state, putCard}) {

    return state.players.map((player, j) => (
        <div key={Date.now() + Math.random().toFixed(j)} className="row">
            {player.getField()._stack.map((card, i) => (
                <div
                    key={Date.now() + Math.random().toFixed(i)}
                    className={`${state.turn !== j ? "disabled" : ""} cell`}
                    onClick={() => state.turn === j && putCard(card)}
                >
                    <Card  card={card} state={state}/>
                </div>
            ))}
            <div className='trump-wrapper'>
                Trump
                <span className={`card ${player.userTrump.color}`}>
                    {player.trumpDeck.length}
                    {player.userTrump.symbol}
          </span>
            </div>
        </div>
    ));
}
