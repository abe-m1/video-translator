import { useEffect, useState } from 'react';
import styles from '../styles/VideoPlayer.module.scss';

export default function VideoPlayer({ video, getTimeBeforeSave, dictionary }) {
  let player;
  let [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    console.log(dictionary);
  }, [dictionary]);

  const loadVideo = () => {
    // the Player object is created uniquely based on the id in props
    player = new window.YT.Player(`youtube-player`, {
      // videoId: video.id.videoId,
      videoId: 'MaFU5Wc-evM',
      events: {
        onReady: onPlayerReady,
        onStateChange: getITime,
      },
    });

    setInterval(() => {
      if (player) {
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
    // console.log(e.target);
    let time = e.target.getCurrentTime();
    // console.log('TT', e.target.getCurrentTime());
  };

  const getTime = () => {
    console.log(player.getCurrentTime());
  };

  const positionIndicator = Math.floor(currentTime / 20);

  if (!video) {
    return <h1>select a video</h1>;
  }
  return (
    <>
      <div class="embed-responsive embed-responsive-16by9">
        {/* <iframe
          class="embed-responsive-item"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
        /> */}
        <div id={`youtube-player`} />
      </div>
      <div class="details">
        <button onClick={getTime}>GET TIME</button>
        {currentTime}

        <p>{positionIndicator}</p>
        {dictionary[positionIndicator] &&
          dictionary[positionIndicator].map((word, i) => (
            <div key={i}>
              <span>{word.french}</span>
              <li>{word.english}</li>
            </div>
          ))}
        {/* <h4>{video.snippet.title}</h4>
        <p>{video.snippet.description}</p> */}
      </div>
    </>
  );
}
