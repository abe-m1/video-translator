import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import VideoPlayer from '../components/VideoPlayer';
import TranslationBox from '../components/TranslationBox';
import dbConnect from '../utils/dbConnect';
import Video from '../models/Video';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_KEY;

const Home = ({ dictionary }) => {
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
    setSelectedVideo(Object.assign({}, modifiedvideo));
  };

  const saveTranslation = async (french, english) => {
    // let time = getTimeBeforeSave();
    console.log('in root', french, english, currentTime);
    const contentType = 'application/json';
    let time = Math.floor(currentTime / 20);
    console.log(time);
    let modified = currentDictionary;
    if (modified[time]) {
      modified[time].push({ french, english, time: currentTime });
    } else {
      modified[`${time}`] = [];
      modified[time].push({ french, english, time: currentTime });
    }
    setCurrentDictionary(Object.assign({}, modified));

    //save to db
    try {
      const res = await fetch('/api/videos', {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        // body: JSON.stringify(form),
        body: JSON.stringify({
          _id: '604d92be15c5783b1735f50e',
          name: 'video2',
          dictionary: modified,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      console.log('res', res);
      // router.push('/')
    } catch (error) {
      console.log(error);
      // setMessage('Failed to add pet');
    }
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
        <div className="container">
          <SearchBar onTermChange={onTermChange} />
          <div className={styles.row}>
            <VideoPlayer
              video={selectedVideo}
              getTimeBeforeSave={getTimeBeforeSave}
              dictionary={currentDictionary}
            />

            <VideoList
              videos={videoList}
              onVideoSelect={onVideoSelect}
              dictionary={currentDictionary}
              currentTime={currentTime}
            />
          </div>
          <TranslationBox saveTranslation={saveTranslation} />
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  // const dictionary = {
  //   0: [
  //     { french: 'un', english: 'one' },
  //     { french: 'deux', english: 'deux' },
  //   ],
  //   1: [
  //     { french: 'trois', english: 'three' },
  //     { french: 'Quatre', english: 'four' },
  //   ],
  //   2: [{ word: 'word2' }],
  // };
  console.log('HERE');
  await dbConnect();

  // const result = await Video.find({});
  const result = await Video.findOne({ name: 'video2' });
  console.log('this is result', result);
  // const video = result.map((doc) => {
  //   const video = doc.toObject();
  //   video._id = video._id.toString();
  //   return video.dictionary;
  // });

  return { props: { dictionary: result.dictionary } };
}

export default Home;