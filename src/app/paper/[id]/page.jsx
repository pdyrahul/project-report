import AboutPaper from '@/components/AboutPaper';
import React from 'react';
import styles from '../../../styles/PaperDetails.module.scss';
const paperDetails = ({ params }) => {
  const { id } = params;
  return (
    <div className={styles.container}>
      <AboutPaper id={id} />
    </div>
  )
};

export default paperDetails;
