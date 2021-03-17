// import styles from '../styles/VideoList.module.scss';
import { useState, useRef } from 'react';

const Reverso = require('reverso-api');
const reverso = new Reverso();
var accentArray = [
  'á',
  'à',
  'ã',
  'â',
  'é',
  'è',
  'ê',
  'í',
  'ì',
  'î',
  'õ',
  'ó',
  'ò',
  'ô',
  'ú',
  'ù',
  'û',
];
var originalText = 'éçàèñ';

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
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#696969',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <p>Translation box</p>
        <input value={french} onChange={onChange} ref={inputRef} />
        {english && <input value={english} onChange={onEnglishChange} />}
        {!searchComplete && (
          <div>
            <button onClick={getTranslation}>Translate</button>

            {error && <p>{error}</p>}
          </div>
        )}
        {searchComplete && (
          <div>
            <button onClick={saveWord}>Save</button>
            <button onClick={reset}>Cancel</button>
          </div>
        )}
      </div>
      <div style={{ width: '40%' }}>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('à')}
        >
          à
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('è')}
        >
          è
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('é')}
        >
          é
        </button>

        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('ç')}
        >
          ç
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('ô')}
        >
          ô
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('ê')}
        >
          ê
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('ï')}
        >
          ï
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('ù')}
        >
          ù
        </button>
        <button
          style={{ padding: '1rem', margin: '.2rem .4rem' }}
          onClick={() => addSpecial('ë')}
        >
          ë
        </button>
      </div>
    </div>
  );
}
