import React from 'react';
import styles from '../stylecss/Home.module.css'; // Importing CSS Module

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to HYPERTECH</h1>
      <p className={styles.description}>Discover the future of technology with us.</p>
      <button className={styles.button}>Learn More</button>
    </div>
  );
};

export default Home;
