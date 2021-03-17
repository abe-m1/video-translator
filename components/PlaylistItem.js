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
        <img class="mr-3" src={video.thumbnail} />
        <div class="media-body" style={{ color: 'lightblue' }}>
          {video.title}
        </div>
      </li>
    </>
  );
}
