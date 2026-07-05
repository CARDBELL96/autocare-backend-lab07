import express from 'express';
import assetRoutes from './adapters/routes/asset.routes';
import { poolPromise } from './infrastructure/database/connection';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', assetRoutes);

app.listen(PORT, async () => {
  await poolPromise; // Ensure DB connection
  console.log(`Server running on port ${PORT}`);
});