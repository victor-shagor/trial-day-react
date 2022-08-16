import React from "react";

interface CardProp {
  id: string;
  name: string;
  position: string;
  age: string;
  status: string;
  onClickMove: (
    applicantId: string,
    presentStatus: string,
    direction: string
  ) => void;
}

const Card = ({ name, age, position, status, id, onClickMove }: CardProp) => {
  return (
    <div style={styles.card}>
      <p data-testid="name">Name: {name}</p>
      <p>Age: {age}</p>
      <p>Postion: {position}</p>
      <div>
        <button
          onClick={() => onClickMove(id, status, "previous")}
          disabled={status === "inReview"}
        >
          previous
        </button>
        <button
          type="button"
          onClick={() => onClickMove(id, status, "next")}
          disabled={status === "offer"}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Card;

const styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    borderRadius: "10px",
    width: "95%",
    height: "200px",
    padding: "5px",
  },
};
