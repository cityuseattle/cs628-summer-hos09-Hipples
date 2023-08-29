import express from 'express';
import cors from 'cors';

import './load-environment.mjs';
import records from './routes/records.mjs';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
