import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 900000,
  max: 100,
});

export default limiter;
