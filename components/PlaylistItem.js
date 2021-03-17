import styles from '../styles/VideoListItem.module.scss';
export default function VideoListItem({ video, onVideoSelect }) {
  // const onVideoSelect = (video) => {
  //   // this.$emit("videoSelect", video);
  // };
  const MIDDLE_DOT = '\u0057';
  console.log(typeof video.title);
  const videoTitle = String(video.title).replace(/&#39;/gi, "'");

  return (
    <>
      <li
        onClick={() => onVideoSelect(video)}
        style={{ listStyle: 'none', display: 'flex' }}
      >
        <img class="mr-3" src={video.thumbnail} />
        <div
          class="media-body"
          style={{ color: 'lightblue', fontSize: '13px', padding: '10px' }}
        >
          {videoTitle}
        </div>
      </li>
    </>
  );
}
