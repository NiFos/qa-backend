import Mongoose from 'mongoose';

const { MONGO } = process.env;

export const connect = () => {
  Mongoose.connect(MONGO || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
  const db = Mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to Mongodb');
  });
}