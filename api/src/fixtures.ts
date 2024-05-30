import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, sipping drop..`);
  }
};

const collections = ["users"];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  await User.create(
    {
      email: 'Alex',
      password: '1234',
      token: crypto.randomUUID(),
      role: "admin",
      googleID: null,
      displayName: "Sasha",
    },
    {
      email: 'Evgeny',
      password: '1234',
      token: crypto.randomUUID(),
      role: "user",
      googleID: null,
      displayName: "John",
    },
  );

  await db.close();
};

void run();