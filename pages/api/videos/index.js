import dbConnect from '../../../utils/dbConnect';
import Video from '../../../models/Video';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const pet = await Video.find();
        if (!pet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const video = await Video.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const video = await Video.findByIdAndUpdate(
          req.body._id,
          { dictionary: req.body.dictionary },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!video) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
