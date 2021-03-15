import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  youTubeId: {
    type: String,
  },
  dictionary: {
    type: Object,
  },
});

// export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
