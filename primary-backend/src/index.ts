import express from 'express';
import { userRouter } from './router/user';
import { zapRouter } from './router/zap';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/v1/user', userRouter);
app.get('/api/v1/zap', zapRouter);

app.listen(3000);
