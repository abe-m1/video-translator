import styles from '../styles/VideoListItem.module.scss';
export default function VideoListItem({ video, onVideoSelect }) {
  // const onVideoSelect = (video) => {
  //   // this.$emit("videoSelect", video);
  // };

  return (
    <>
      <li
        onClick={() => onVideoSelect(video)}
        style={{ listStyle: 'none', display: 'flex' }}
      >
        <img class="mr-3" src={video.snippet.thumbnails.default.url} />
        <div
          class="media-body"
          style={{ color: 'lightblue', fontSize: '13px', padding: '10px' }}
        >
          {video.snippet.title}
        </div>
      </li>
    </>
  );
}
