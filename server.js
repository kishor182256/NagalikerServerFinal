import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import path from 'path';

import { DATABASE_CONNECTION } from "./config.js";
import authRoutes from "./routes/admin.js";
import collectorRoutes from "./routes/collector.js";
import doctorRoutes from "./routes/doctor.js";
import categoryRoutes from "./routes/category.js";
import accountRoutes from "./routes/account.js";
import sampleRoutes from "./routes/sample.js";


const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE_CONNECTION)
  .then(() => console.log('db_connected'))
  .catch(err => console.log(err));

const PORT =  8000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', collectorRoutes);
app.use('/api', doctorRoutes);
app.use('/api', categoryRoutes);
app.use('/api', accountRoutes);
app.use('/api', sampleRoutes);
// app.use('/api', sampleRoutes);


if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  );
}

// app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });



app.listen(8000, () => console.log(`Server running in port ${PORT}`));
