import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import VideoPlayer from '../components/VideoPlayer';
import TranslationBox from '../components/TranslationBox';

const API_KEY = process.env.YOUTUBE_KEY;

const dictionary = {
  0: [
    { french: 'un', english: 'one' },
    { french: 'deux', english: 'deux' },
  ],
  1: [
    { french: 'trois', english: 'three' },
    { french: 'Quatre', english: 'four' },
  ],
  2: [{ word: 'word2' }],
};

const Home = () => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [currentDictionary, setCurrentDictionary] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    setCurrentDictionary(dictionary);
  }, []);
  const onTermChange = (searchTerm) => {
    console.log(searchTerm);
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: searchTerm,
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setVideoList(response.data.items);
      });
  };

  const onVideoSelect = (video) => {
    console.log('on sleect', video);
    setSelectedVideo(video);
  };

  const saveTranslation = (french, english) => {
    // let time = getTimeBeforeSave();
    console.log('in root', french, english, currentTime);
    let time = Math.floor(currentTime / 20);
    console.log(time);
    let modified = currentDictionary;
    if (modified[time]) {
      modified[time].push({ french, english });
    } else {
      modified[`${time}`] = [];
      modified[time].push({ french, english });
    }
    setCurrentDictionary(Object.assign({}, modified));
  };

  const getTimeBeforeSave = (time) => {
    setCurrentTime(time);
    // return time;
  };
  console.log('rerender');
  return (
    <div>
      <Head>
        <title>Video App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div class="container">
          <SearchBar onTermChange={onTermChange} />
          <div className={styles.row}>
            <VideoPlayer
              video={selectedVideo}
              getTimeBeforeSave={getTimeBeforeSave}
              dictionary={currentDictionary}
            />
            <div style={{ width: '80%' }}></div>
            <VideoList videos={videoList} onVideoSelect={onVideoSelect} />
          </div>
          <TranslationBox saveTranslation={saveTranslation} />
        </div>
      </main>
    </div>
  );
};

export default Home;
