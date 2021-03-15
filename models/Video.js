import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  etag: {
    type: String,
  },
  dictionary: {
    type: Object,
  },
  videoId: { type: String },
  title: { type: String },
  thumbnail: { type: String },
});

// export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
