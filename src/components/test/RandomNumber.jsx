import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateRandom, resetNumber } from "../../redux/RandomSlice";
import FriendshipTest from "./FriendshipTest";

const RandomNumber = () => {
    const dispatch = useDispatch();
    const number = useSelector((state) => state.random.number);

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>🎲 Random Number: {number}</h2>
                <button onClick={() => dispatch(generateRandom())}>🔢 Generate Number</button>
                <button onClick={() => dispatch(resetNumber())} style={{ marginLeft: "20px" }}>🔄 Reset</button>
            </div>

            <hr></hr>
            <FriendshipTest />
        </>
    );
};

export default RandomNumber;
