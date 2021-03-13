// import styles from '../styles/VideoList.module.scss';
import { useState } from 'react';

const Reverso = require('reverso-api');
const reverso = new Reverso();

export default function TranslationBox({ saveTranslation }) {
  let [searchComplete, setSearchComplete] = useState(false);
  let [french, setFrench] = useState('');
  let [english, setEnglish] = useState('');
  const onChange = (e) => {
    setFrench(e.target.value);
  };

  const onEnglishChange = (e) => {
    setEnglish(e.target.value);
  };
  const getTranslation = async () => {
    const result = await reverso.getTranslation(french, 'French', 'English');
    console.log(result.translation[0]);
    setEnglish(result.translation[0]);
    setSearchComplete(true);
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
    <>
      <div>Translation Box</div>
      <input value={french} onChange={onChange} />
      {english && <input value={english} onChange={onEnglishChange} />}
      {!searchComplete && <button onClick={getTranslation}>Translate</button>}
      {searchComplete && (
        <div>
          <button onClick={saveWord}>Save</button>
          <button onClick={reset}>Cancel</button>
        </div>
      )}
    </>
  );
}
