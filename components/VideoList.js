import styles from '../styles/VideoList.module.scss';
import VideoListItem from './VideoListItem';

export default function VideoList({ videos, onVideoSelect }) {
  // const onVideoSelect = (video) => {
  //   // this.$emit("videoSelect", video);
  //   console.log('video', video);
  // };

  let videoItems =
    videos &&
    videos.map((video) => {
      return <VideoListItem video={video} onVideoSelect={onVideoSelect} />;
    });

  return (
    <>
      <ul>{videoItems}</ul>
    </>
  );
}
