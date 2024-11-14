import 'dotenv/config';

import express from 'express';
import env from '@/config/environment';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

const FIVE_MINUTES_IN_MILISECONDS = 5 * 60 * 1000;
const MAX_REQUEST_PER_IP = 100;

app.use(
  rateLimit({
    windowMs: FIVE_MINUTES_IN_MILISECONDS,
    limit: MAX_REQUEST_PER_IP
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(env.PORT, () => {
  console.log(`Server is listening in port: ${env.PORT}`);
});
