import mongoose from 'mongoose';

async function connectDatabase() {
  await mongoose.connect('');
}

export default connectDatabase;
