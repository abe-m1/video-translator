import styles from '../styles/SearchBar.module.scss';
export default function SearchBar({ onTermChange }) {
  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Search YouTube for videos"
        className={styles.input}
        onChange={(e) => onTermChange(e.target.value)}
      />
      <button> Search</button>
    </div>
  );
}
