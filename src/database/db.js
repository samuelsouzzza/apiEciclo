import mongoose from 'mongoose';

async function connectDatabase() {
  await mongoose.connect(
    'mongodb+srv://samuelsouzzza:AXWIaMABIckHlOwy@e-ciclo-db.uvcd4fw.mongodb.net/eciclo?retryWrites=true&w=majority&appName=E-Ciclo-DB'
  );
}

export default connectDatabase;
