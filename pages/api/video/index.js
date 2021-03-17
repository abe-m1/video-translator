import dbConnect from '../../../utils/dbConnect';
import Video from '../../../models/Video';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const video = await Video.find({
          etag: req.body.etag,
        }); /* find all the data in our database */

        if (video.length > 0) {
          res.status(200).json({ success: true, data: video[0] });
        }

        if (!video.length) {
          try {
            const video = await Video.create(
              req.body
            ); /* create a new model in the database */
            res.status(201).json({ success: true, data: video });
          } catch (error) {
            res.status(400).json({ success: false });
          }
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
