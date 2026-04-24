import express from 'express';
import Stat from './Stat.model.js';
import { User } from './User.model.js';
import { connectDB } from './db.js';

const router = express.Router();

// Get real-time stats
router.get('/', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    // @ts-ignore
    let stats = await Stat.findOne({ name: 'global' });
    if (!stats) {
    // @ts-ignore
      stats = await Stat.create({ name: 'global', views: 0, downloads: 0 });
    }
    res.json({
      success: true,
      users: userCount,
      views: stats.views,
      downloads: stats.downloads
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

router.get('/items', async (req, res) => {
  try {
    const dbInstance: any = await connectDB();
    const db = dbInstance?.db || dbInstance;
    const items = await db.collection("itemStats").find({}).toArray();
    res.json({ success: true, items });
  } catch (error) {
    console.error("Error fetching item stats:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Increment views
router.post('/view', async (req, res) => {
  try {
    // @ts-ignore
    const stats = await Stat.findOneAndUpdate(
      { name: 'global' },
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, views: stats.views });
  } catch (error) {
    console.error("Error incrementing view:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Increment global download
router.post('/download', async (req, res) => {
  try {
    // @ts-ignore
    const stats = await Stat.findOneAndUpdate(
      { name: 'global' },
      { $inc: { downloads: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, downloads: stats.downloads });
  } catch (error) {
    console.error("Error incrementing download:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Increment item download
router.post('/download/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const dbInstance: any = await connectDB();
    const db = dbInstance?.db || dbInstance;
    
    const result = await db.collection("itemStats").findOneAndUpdate(
      { itemId: String(itemId) },
      { $inc: { downloads: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    
    // Also increment global downloads
    // @ts-ignore
    await Stat.findOneAndUpdate({ name: 'global' }, { $inc: { downloads: 1 } }, { upsert: true });

    res.json({ success: true, itemId: String(itemId), downloads: result ? result.downloads : 1 });
  } catch (error) {
    console.error("Error incrementing item download:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

export default router;
