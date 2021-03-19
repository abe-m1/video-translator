import styles from '../styles/TranslationBox.module.scss';
import { useState, useRef } from 'react';

const Reverso = require('reverso-api');
const reverso = new Reverso();
// var accentArray = [
//   'á',
//   'à',
//   'ã',
//   'â',
//   'é',
//   'è',
//   'ê',
//   'í',
//   'ì',
//   'î',
//   'õ',
//   'ó',
//   'ò',
//   'ô',
//   'ú',
//   'ù',
//   'û',
// ];

export default function TranslationBox({ saveTranslation }) {
  let [searchComplete, setSearchComplete] = useState(false);
  let [french, setFrench] = useState('');
  let [english, setEnglish] = useState('');
  let [error, setError] = useState('');
  let inputRef = useRef(null);

  const onChange = (e) => {
    setFrench(e.target.value);
  };

  const addSpecial = (char) => {
    inputRef.current.focus();
    setFrench(french + char);
  };

  const onEnglishChange = (e) => {
    setEnglish(e.target.value);
  };
  const getTranslation = async () => {
    try {
      const result = await reverso.getTranslation(french, 'French', 'English');
      setEnglish(result.translation[0]);
      setSearchComplete(true);
    } catch (error) {
      setError('Translation not found');
    }
  };

  const saveWord = () => {
    saveTranslation(french, english);
    setEnglish('');
    setFrench('');
    setSearchComplete(false);
  };

  const reset = () => {
    setEnglish('');
    setFrench('');
    setSearchComplete(false);
  };
  return (
    <div className={styles.container}>
      <div>
        <textarea
          className={styles.inputBox}
          value={french}
          onChange={onChange}
          ref={inputRef}
          placeholder="Type in a word or phrase in french"
        />

        <textarea
          className={styles.inputBox}
          value={english}
          onChange={onEnglishChange}
          placeholder="English translation"
        />

        <div>
          <button onClick={getTranslation}>Translate</button>
          {searchComplete && (
            <>
              <button onClick={saveWord}>Save</button>
              <button onClick={reset}>Clear</button>
            </>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
      <div className={styles.specialCharacterContainer}>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('à')}
        >
          à
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('è')}
        >
          è
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('é')}
        >
          é
        </button>

        <button
          className={styles.characterButton}
          onClick={() => addSpecial('ç')}
        >
          ç
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('ô')}
        >
          ô
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('ê')}
        >
          ê
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('ï')}
        >
          ï
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('ù')}
        >
          ù
        </button>
        <button
          className={styles.characterButton}
          onClick={() => addSpecial('ë')}
        >
          ë
        </button>
      </div>
    </div>
  );
}
