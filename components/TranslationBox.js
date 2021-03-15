// import styles from '../styles/VideoList.module.scss';
import { useState } from 'react';

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
  const onChange = (e) => {
    setFrench(e.target.value);
  };
  const addSpecial = (char) => {
    setFrench(french + char);
  };

  const onEnglishChange = (e) => {
    setEnglish(e.target.value);
  };
  const getTranslation = async () => {
    try {
      const result = await reverso.getTranslation(french, 'French', 'English');
      console.log(result.translation[0]);
      setEnglish(result.translation[0]);
      setSearchComplete(true);
    } catch (error) {
      console.log(error);
      setError('Translation not found');
    }

    // .then((response) => {
    //   return console.log(response);
    // })
    // .catch((err) => {
    //   return console.error(err);
    // });
  };

  const saveWord = () => {
    console.log('saving word');
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
      style={{ padding: '2rem', backgroundColor: '#696969', display: 'flex' }}
    >
      <div>
        <p>Translation box</p>
        <input value={french} onChange={onChange} />
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
      <div>
        <button onClick={() => addSpecial('à')}>à</button>
        <button onClick={() => addSpecial('è')}>è</button>
        <button onClick={() => addSpecial('é')}>é</button>

        <button onClick={() => addSpecial('ç')}>ç</button>
        <button onClick={() => addSpecial('ô')}>ô</button>
        <button onClick={() => addSpecial('ê')}>ê</button>
        <button onClick={() => addSpecial('ï')}>ï</button>
        <button onClick={() => addSpecial('ù')}>ù</button>
        <button onClick={() => addSpecial('ë')}>ë</button>
      </div>
    </div>
  );
}
