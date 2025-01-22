import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Middle.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function MiddleSection() {
  const data1 = {
    labels: ['Blue', 'Yellow', 'Purple'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['#4c6ef5', '#f59f00', '#d6336c'],
        borderColor: ['#000000', '#000000', '#000000'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        right: 20,
      },
    },
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.middleSection}>
      {/* 현 날짜 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p>Today's Date</p>
        </div>
        <div className={styles.cardBody}>
          <h2>{currentDate}</h2>
        </div>
      </div>

      {/* New Clients 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p>Total Acceptance</p>
        </div>
        <div className={styles.cardBody}>
          <h2>321</h2>
        </div>
      </div>

      {/* 차트 1 */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Chart 1</h3>
        <div className={styles.pieChart}>
          <Pie data={data1} options={options} />
        </div>
      </div>

      {/* 차트 2 */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Chart 2</h3>
        <div className={styles.pieChart}>
          <Pie data={data1} options={options} />
        </div>
      </div>

      {/* 차트 3 */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Chart 3</h3>
        <div className={styles.pieChart}>
          <Pie data={data1} options={options} />
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
