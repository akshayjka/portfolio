const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

const MONGO_URI = "mongodb+srv://akshayjai19001900_db_user:Akshay_2001@cluster0.fcvjhuq.mongodb.net/";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

const EnquirySchema = new mongoose.Schema({
  name: String, email: String, subject: String, message: String, date: String
});
const ItemSchema = new mongoose.Schema({
  id: String, type: String, title: String, desc: String, image: String, link: String, date: String
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);
const Item = mongoose.model('Item', ItemSchema);

app.post('/api/enquiry', async (req, res) => {
  try {
    const enq = new Enquiry(req.body);
    await enq.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/upload', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/upload/:id', async (req, res) => {
  try {
    await Item.findOneAndUpdate({ id: req.params.id }, req.body);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/upload/:id', async (req, res) => {
  try {
    await Item.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));