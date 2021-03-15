import styles from '../styles/VideoListItem.module.scss';
export default function VideoListItem({ video, onVideoSelect }) {
  // const onVideoSelect = (video) => {
  //   // this.$emit("videoSelect", video);
  // };

  return (
    <>
      <li onClick={() => onVideoSelect(video)} class="">
        <img class="mr-3" src={video.snippet.thumbnails.default.url} />
        <div class="media-body">{video.snippet.title}</div>
      </li>
    </>
  );
}
