import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateScore } from "../../redux/FriendshipSlice";

const FriendshipTest = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const score = useSelector((state) => state.friendship.score);
  const dispatch = useDispatch();

  const handleCalculate = () => {
    if (name1.trim() === "" || name2.trim() === "") {
      alert("براہ کرم دونوں نام درج کریں!");
      return;
    }
    dispatch(calculateScore());
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", color: "blue", marginBottom: "10px" }}>💖 Friendship Test 💖</h1>

      <input
        type="text"
        placeholder="پہلا نام درج کریں"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        style={{
          padding: "10px",
          margin: "5px",
          width: "200px",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      />

      <input
        type="text"
        placeholder="دوسرا نام درج کریں"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
        style={{
          padding: "10px",
          margin: "5px",
          width: "200px",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      />

      <br />

      <button
        onClick={handleCalculate}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        🔍 Friendship Check
      </button>

      {score !== null && (
        <h2 style={{ marginTop: "20px", fontSize: "20px", color: "green" }}>
          🎯 Friendship Score: <span>{score}%</span>
        </h2>
      )}
    </div>
  );
};

export default FriendshipTest;
