import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', Routes);

const configureNgrok = `Use "ngrok http ${PORT}" to create a public https url as needed by Dialogflow Fulfillments`;
const testNow = `Surf to http://localhost:${PORT}`;
app.listen(PORT, () => console.log(`Server running on port ${PORT}.\n${configureNgrok}\n${testNow}`));
