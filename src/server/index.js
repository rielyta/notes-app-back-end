import express from 'express';
import router from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';

const app = express();

app.use(express.json());

// pakai router utama
app.use(router);

// error handler terakhir
app.use(ErrorHandler);

export default app;