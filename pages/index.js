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

const Home = ({ currentPlaylist }) => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [currentDictionary, setCurrentDictionary] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    setPlaylist(currentPlaylist);
  }, []);

  const onTermChange = (searchTerm) => {
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
        setVideoList(response.data.items);
      });
  };

  const onVideoSelect = async (video) => {
    const contentType = 'application/json';
    // setSelectedVideo(Object.assign({}, video));
    const res = await fetch('/api/video', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
        // ...form,
        etag: video.etag,
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url,
      }),
    });
    const { data } = await res.json();

    setCurrentDictionary(Object.assign({}, data.dictionary || {}));
    setSelectedVideo(data);
    setVideoList([]);

    // await dbConnect();

    // // const result = await Video.find({});
    // const result = await Video.findOne({ etag: video.etag });
    // console.log('this is result', result);
  };

  const onPlaylistSelect = async (video) => {
    const contentType = 'application/json';

    // setSelectedVideo(Object.assign({}, video));
    const res = await fetch('/api/video', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
        // ...form,
        etag: video.etag,
      }),
    });
    const { data } = await res.json();

    setCurrentDictionary(Object.assign({}, data.dictionary || {}));
    setSelectedVideo(data);

    // await dbConnect();

    // // const result = await Video.find({});
    // const result = await Video.findOne({ etag: video.etag });
    // console.log('this is result', result);
  };

  const saveTranslation = async (french, english) => {
    // let time = getTimeBeforeSave();
    const contentType = 'application/json';
    let time = Math.floor(currentTime / 20);
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
          _id: selectedVideo._id,
          name: 'video2',
          dictionary: modified,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      // router.push('/')
    } catch (error) {
      console.log(error);
      // setMessage('Failed to add pet');
    }
  };

  const getTimeBeforeSave = (time) => {
    console.log(time);
    setCurrentTime(time);
    // return time;
  };

  const resetSearch = () => {
    setVideoList([]);
  };
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
              onPlaylistSelect={onPlaylistSelect}
              dictionary={currentDictionary}
              playlist={playlist}
              currentTime={currentTime}
              resetSearch={resetSearch}
            />
          </div>
          <TranslationBox saveTranslation={saveTranslation} />
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
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
  await dbConnect();

  // const result = await Video.find({});
  const result = await Video.find({});
  const playlist = result.map((doc) => {
    const video = doc.toObject();
    video._id = video._id.toString();
    return video;
  });
  return { props: { currentPlaylist: playlist } };
}

export default Home;
