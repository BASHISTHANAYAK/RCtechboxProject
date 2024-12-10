import express from 'express'
import recordModel from "../models/Record.js"
const router = express.Router();

// Create a new record
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const isEmailExist = await recordModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "email exists try other one!" });

    }
    const record = await recordModel.create({ name, email, age });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all records
router.get('/', async (req, res) => {
  try {
    const records = await recordModel.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const record = await recordModel.findByIdAndUpdate(id, { name, email, age }, { new: true });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await recordModel.findByIdAndDelete(id);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router
