import styles from '../styles/PlayListItem.module.scss';
export default function VideoListItem({ video, onVideoSelect }) {
  const videoTitle = String(video.title).replace(/&#39;/gi, "'");

  return (
    <div className={styles.topContainer} style={{ position: 'relative' }}>
      <li onClick={() => onVideoSelect(video)} className={styles.listContainer}>
        <img src={video.thumbnail} />
        <div className={styles.videoTitle}>{videoTitle}</div>
      </li>
      <a onClick={() => console.log('clicked')} className={styles.delete}>
        Del
      </a>
    </div>
  );
}
