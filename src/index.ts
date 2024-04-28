import dotenv from 'dotenv';
import mongoose from 'mongoose';
import callsRouter from './routers/Calls';
import usersRouter from './routers/Users';
const express = require('express');
const PORT = process.env.PORT || 3000;

dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());

const DATABASE_URI = process.env.DATABASE?.replace(
  '<password>',
  process.env.DATABASE_PASSWORD || ''
);

app.get('/', (req: any, res: any) => {
  res.status(200).send({ status: 'success', data: 'Api v1' });
});
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/calls', callsRouter);

// Connect to MongoDB
// @ts-ignore
mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
