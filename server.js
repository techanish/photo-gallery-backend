const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('YOUR_MONGODB_ATLAS_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const photoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Photo = mongoose.model('Photo', photoSchema);

app.get('/photos', async (req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });
  res.json(photos);
});

app.post('/photos', async (req, res) => {
  const { title, imageUrl } = req.body;
  const newPhoto = new Photo({ title, imageUrl });
  await newPhoto.save();
  res.json(newPhoto);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
