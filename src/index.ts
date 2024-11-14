import 'dotenv/config';

import env from '@/config/environment';
import logger from '@/config/logger';
import swaggerDocs from '@/config/swagger';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(env.PORT, () => {
  logger.debug(`Server is listening in port: ${env.PORT}`);
});
