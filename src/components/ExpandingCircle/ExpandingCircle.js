import React from 'react';
import styles from './ExpandingCircle.scss';

const ExpandingCircle = () => (
  <div className={styles.circle}>
    <div className={styles.topContent}>Burrito</div>
    <div className={styles.midContent}>Taco</div>
    <div className={styles.bottomContent}>Carnitas</div>
  </div>
);

export default ExpandingCircle;
