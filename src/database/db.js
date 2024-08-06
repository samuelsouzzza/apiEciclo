import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDatabase() {
  await mongoose.connect(process.env.STRING_DATABASE);
}

export default connectDatabase;
