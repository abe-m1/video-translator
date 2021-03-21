import { useState } from 'react';
import styles from '../styles/SearchBar.module.scss';

export default function SearchBar({ onSubmit, wordCount, takeQuiz, video }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <input
          placeholder="Search YouTube for videos in French"
          className={styles.input}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={styles.searchButton}
          onClick={() => onSubmit(searchTerm)}
        >
          {' '}
          Search
        </button>
      </div>

      <div>
        {video._id && (
          <div>
            Word Count: {wordCount}{' '}
            {wordCount > 6 && <button onClick={takeQuiz}>Take Quiz</button>}
          </div>
        )}
      </div>
    </div>
  );
}
