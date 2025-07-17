// pages/api/users.js
import clientPromise from '../../../app/../../lib/mongodb';

export default async function handler(req, res) {
    
  const client = await clientPromise;
  const db = client.db('daily-dua');
  const users = await db.collection('sales').find({}).toArray();
  res.json(users);
}
