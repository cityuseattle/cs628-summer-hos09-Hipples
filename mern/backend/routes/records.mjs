import express from 'express';
import { ObjectId } from 'mongodb';

import connectToDB from '../db/conn.mjs';

const router = express.Router();

// Get a list of all records
router.get("/", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("records");
  const result = await collection.find({}).toArray();
  res.status(200).send(result);  // code: OK
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("records");
  const query = { _id: new ObjectId(req.params.id) }
  const result = await collection.findOne(query);

  if (!result) res.status(404).send({ error: "Not found"});  // code: Not Found
  else res.status(200).send(result);
});

// Add a new record
router.post("/", async (req, res) => {
  const newDocument = { 
    name: req.body.name,
    position: req.body.position,
    level: req.body.level
  }
  const db = await connectToDB();
  const collection = db.collection("records");
  const result = await collection.insertOne(newDocument);
  res.status(201).send(result);  // code: Created
});

// Update a record by id
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const updates = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  }
  const db = await connectToDB();
  const collection = db.collection("records");
  const result = await collection.updateOne(query, updates);
  res.status(200).send(result);
});

// Delete a record by id
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const db = await connectToDB();
  const collection = db.collection("records");
  const result = await collection.deleteOne(query);
  res.status(204).send(result);  // code: No Content
});

export default router;
