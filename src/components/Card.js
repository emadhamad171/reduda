import React from "react";

export default function Card({card, onClick}) {

    return (
        <div onClick={onClick}><span className={`card ${card?.color}`}>{card?.symbol}</span></div>

    );
}
