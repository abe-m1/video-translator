import { useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import styles from '../styles/VideoList.module.scss';
import VideoListItem from './VideoListItem';
import PlaylistItem from './PlaylistItem';

export default function VideoList({
  videos,
  onVideoSelect,
  onPlaylistSelect,
  currentTime,
  resetSearch,
  playlist,
  dictionary,
}) {
  const [showVideoList, setShowVideoList] = useState(true);
  // const onVideoSelect = (video) => {
  //   // this.$emit("videoSelect", video);
  //   console.log('video', video);
  // };
  const positionIndicator = Math.floor(currentTime / 20);

  let videoItems =
    videos &&
    videos.map((video) => {
      return (
        <VideoListItem
          video={video}
          onVideoSelect={() => onVideoSelect1(video)}
        />
      );
    });

  let playlistItems =
    playlist &&
    playlist.map((video) => {
      return (
        <PlaylistItem
          video={video}
          onVideoSelect={() => onPlaylistSelect1(video)}
        />
      );
    });

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);

    let result = '';
    if (hrs > 0) {
      result += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    result += '' + mins + ':' + (secs < 10 ? '0' : '');
    result += '' + secs;
    return result;
  };

  const onVideoSelect1 = (video) => {
    onVideoSelect(video);
  };

  const onPlaylistSelect1 = (video) => {
    onPlaylistSelect(video);
    setShowVideoList(false);
  };

  const reset = () => {
    setShowVideoList(true);
    resetSearch();
  };

  return (
    <div class={styles.container}>
      {videos.length > 0 && (
        <div>
          <div className={styles.searchBox}>
            <a onClick={() => reset()}>Back</a>
            <a>Search Results</a>
            {/* <a onClick={() => setShowVideoList(false)}>Translations</a> */}
          </div>
          <ul>{videoItems}</ul>
        </div>
      )}
      {!videos.length && (
        <>
          <div className={styles.selectorBox}>
            <a
              style={{ backgroundColor: showVideoList ? 'skyblue' : '' }}
              onClick={() => setShowVideoList(true)}
            >
              Playlist
            </a>
            <a
              style={{ backgroundColor: showVideoList ? '' : 'skyblue' }}
              onClick={() => setShowVideoList(false)}
            >
              Translations
            </a>
          </div>

          {/* <ul>{videoItems}</ul> */}

          <div class="details">
            {/* <button onClick={getTime}>GET TIME</button>
        {currentTime} */}
            {showVideoList && <ul>{playlistItems}</ul>}
            {/* <p>{positionIndicator}</p>
        <p>{currentTime}</p> */}
            {!showVideoList && (
              <ul style={{ padding: 0 }}>
                {dictionary[positionIndicator] &&
                  dictionary[positionIndicator].map((word, i) => {
                    return (
                      <li key={i} style={{ display: 'flex' }}>
                        <p className={styles.time}>
                          {formatTime(Math.round(word.time))}
                        </p>
                        <div>
                          <p
                            style={{
                              padding: '1rem',
                              color: 'skyblue',
                              fontSize: '18px',
                              fontWeight: '700',
                              margin: 0,
                              paddingBottom: 0,
                            }}
                          >
                            {word.french}
                          </p>
                          <p
                            style={{
                              padding: '1rem',
                              color: 'lightgray',
                              margin: 0,
                              paddingTop: '5px',
                            }}
                          >
                            {word.english}
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}

            {/* <h4>{video.snippet.title}</h4>
        <p>{video.snippet.description}</p> */}
          </div>
        </>
      )}
    </div>
  );
}
