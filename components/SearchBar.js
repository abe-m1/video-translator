import styles from '../styles/SearchBar.module.scss';
export default function SearchBar({ onTermChange }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onChange={(e) => onTermChange(e.target.value)}
      />
    </div>
  );
}
