import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true })); //it looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input into JS-accessible variables under req.body
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); //req.body object will contain values of any type instead of just strings
app.use(cors());

app.use('/posts', postRoutes)
const CONNECTION_URL = 'mongodb+srv://huimin_zhang:huiminzhang123@cluster0.tjxfa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))