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

const TEN_SECONDS_IN_MILLISECONDS = 10 * 1000;
const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;
const MAX_REQUEST_PER_IP = 100;

app.use(
  rateLimit({
    windowMs: FIVE_MINUTES_IN_MILLISECONDS,
    limit: MAX_REQUEST_PER_IP
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = app.listen(env.PORT, async () => {
  logger.info(`Server is listening in port: ${env.PORT}`);
});

const gracefulShutdown = (signal: string) => {
  return async () => {
    const shutdownTimeout = setTimeout(() => {
      logger.info('Forcing shutdown due to timeout');
      process.exit(1);
    }, TEN_SECONDS_IN_MILLISECONDS);

    logger.info(`Received signal to terminate: ${signal}`);

    server.close(async (err) => {
      clearTimeout(shutdownTimeout);
      if (err) {
        logger.error('Error while closing server:', err);
        process.exit(1);
      }

      logger.info('HTTP server closed.');

      process.exit(0);
    });
  };
};

process.on('SIGTERM', gracefulShutdown('SIGTERM'));

process.on('SIGINT', gracefulShutdown('SIGINT'));
