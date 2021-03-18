import { useEffect, useState } from 'react';
import styles from '../styles/VideoPlayer.module.scss';

export default function VideoPlayer({ video, getTimeBeforeSave, dictionary }) {
  var player;
  let videotime;
  let intervalSetting;
  let [currentTime, setCurrentTime] = useState(0);
  let [loadFirst, setLoadFirst] = useState(false);
  useEffect(() => {
    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else if (!loadFirst) {
      setLoadFirst(true);
      // If script is already there, load the video directly
      loadVideo();
    } else {
      loadNext();
    }
  }, [video]);

  useEffect(() => {}, [dictionary]);

  function loadVideo() {
    if (!video.videoId) {
      return;
    }

    player = new window.YT.Player(`youtube-player`, {
      videoId: video.videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: getITime,
      },
    });
  }

  async function loadNext() {
    player = YT.get('youtube-player');
    await player.loadVideoById({ videoId: video.videoId });
  }

  function onPlayerReady(event) {
    let oldTime;

    intervalSetting = setInterval(() => {
      if (event && event.target.getCurrentTime) {
        let time = event.target.getCurrentTime();

        if (oldTime != time) {
          oldTime = time;
          getTimeBeforeSave(time);
        }
      }
    }, 5000);
  }

  function getITime(e) {
    console.log(e);
  }

  const getTime = () => {
    console.log(player.getCurrentTime());
  };

  if (!video.videoId) {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: 'black',
          flex: '70%',
          margin: 'auto',
          height: '60vh',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: 'white' }}>select a video from the playlist</h1>
        <h2 style={{ color: 'white' }}>or search for a new video</h2>
      </div>
    );
  }
  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'black',
        flex: '70%',
        margin: 0,
        height: '60vh',
      }}
    >
      <div id={`youtube-player`} />
    </div>
  );
}
