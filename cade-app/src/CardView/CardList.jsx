import React from "react";
import Card from "./Card";
import styles from "./Card.module.css";

const cards = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Card ${i + 1}`,
  description: "This is a description.",
  buttonText: "Click Me",
}));

export default function CardList() {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
