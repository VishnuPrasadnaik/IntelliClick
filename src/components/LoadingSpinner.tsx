import styles from '../styles/Home.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;