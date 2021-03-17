import { useEffect, useState } from 'react';
import styles from '../styles/VideoPlayer.module.scss';

export default function VideoPlayer({ video, getTimeBeforeSave, dictionary }) {
  let player;
  let [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    console.log('new video', video);
    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If script is already there, load the video directly
      loadVideo();
    }
  }, [video]);

  useEffect(() => {
    console.log(dictionary);
  }, [dictionary]);

  const loadVideo = () => {
    if (!video.videoId) {
      return;
    }
    // the Player object is created uniquely based on the id in props
    // let videoId;
    // if (!video.videoId) {
    //   videoId = 'MaFU5Wc-evM';
    // } else {
    //   videoId = video.id.videoId;
    // }
    player = new window.YT.Player(`youtube-player`, {
      // videoId: video.id.videoId,
      // videoId: 'MaFU5Wc-evM',

      videoId: video.videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: getITime,
      },
    });
    console.log('player1', player);
    setInterval(() => {
      if (player) {
        console.log(player);
        setCurrentTime(player.getCurrentTime());
        //TODO
        getTimeBeforeSave(player.getCurrentTime());
      }
    }, 5000);
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onVideoSelect = (video) => {
    // this.$emit("videoSelect", video);
    console.log('video', video);
  };

  const getITime = (e) => {
    let time = e.target.getCurrentTime();
  };

  const getTime = () => {
    console.log(player.getCurrentTime());
  };

  const positionIndicator = Math.floor(currentTime / 20);

  if (!video.videoId) {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: 'black',
          flex: '70%',
          margin: 'auto',
          height: '70vh',
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
        backgroundColor: 'black',
        flex: '70%',
        margin: 'auto',
      }}
    >
      {/* <iframe
          class="embed-responsive-item"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
        /> */}
      <div id={`youtube-player`} />
    </div>
  );
}
