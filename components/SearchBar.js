import { useState } from 'react';
import styles from '../styles/SearchBar.module.scss';

export default function SearchBar({ onTermChange, onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Search YouTube for videos"
        className={styles.input}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => onSubmit(searchTerm)}> Search</button>
    </div>
  );
}
