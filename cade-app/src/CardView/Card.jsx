import React from "react";
import styles from "./Card.module.css";

export default function Card({ title, description, buttonText }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.button}>{buttonText}</button>
    </div>
  );
}
