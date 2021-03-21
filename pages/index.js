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
import Quiz from '../components/Quiz';
import Modal from '../components/DeleteModal';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
const contentType = 'application/json';

const Home = ({ currentPlaylist }) => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [currentDictionary, setCurrentDictionary] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [count, setCount] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setPlaylist(currentPlaylist);
  }, []);

  const onSubmit = (searchTerm) => {
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
    const res = await fetch('/api/video', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
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
  };

  const onPlaylistSelect = async (video) => {
    const res = await fetch('/api/video', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
        etag: video.etag,
      }),
    });
    const { data } = await res.json();
    let wordCount = 0;
    if (data.dictionary) {
      Object.values(data.dictionary).forEach(
        (line) => (wordCount += line.length)
      );
      setCount(wordCount);
    }

    setCurrentDictionary(Object.assign({}, data.dictionary || {}));
    setSelectedVideo(data);
    setQuizMode(false);
  };

  const saveTranslation = async (french, english) => {
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
        body: JSON.stringify({
          _id: selectedVideo._id,
          dictionary: modified,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeBeforeSave = (time) => {
    console.log(time);
    setCurrentTime(time);
  };

  const resetSearch = () => {
    setVideoList([]);
  };

  const takeQuiz = () => {
    console.log('take quiz');
    setQuizMode(true);
  };

  const deletePlaylist = (video) => {
    console.log('delete', video);
    setModal(true);
  };
  const cancelDelete = () => {
    setModal(false);
  };
  const confirmDelete = () => {
    console.log('confirm delete');
    setModal(false);
  };

  return (
    <div>
      <Head>
        <title>Video App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SearchBar onSubmit={onSubmit} wordCount={count} takeQuiz={takeQuiz} />
        <div className={styles.container}>
          <div className={styles.row}>
            {!quizMode && (
              <>
                <VideoPlayer
                  video={selectedVideo}
                  getTimeBeforeSave={getTimeBeforeSave}
                  dictionary={currentDictionary}
                />

                <TranslationBox saveTranslation={saveTranslation} />
              </>
            )}
            {quizMode && (
              <>
                <Quiz dictionary={currentDictionary} />
                <TranslationBox saveTranslation={saveTranslation} />
              </>
            )}
          </div>
          <VideoList
            videos={videoList}
            onVideoSelect={onVideoSelect}
            onPlaylistSelect={onPlaylistSelect}
            dictionary={currentDictionary}
            playlist={playlist}
            currentTime={currentTime}
            resetSearch={resetSearch}
            deletePlaylist={deletePlaylist}
          />
        </div>
      </main>
      <Modal
        showModal={modal}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const result = await Video.find({});
  const playlist = result.map((doc) => {
    const video = doc.toObject();
    video._id = video._id.toString();
    return video;
  });
  return { props: { currentPlaylist: playlist } };
}

export default Home;
