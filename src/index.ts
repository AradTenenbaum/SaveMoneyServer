import express, {Application} from 'express';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname.replace('src', '')+'.env' });
const cors = require('cors');

const userRoute = require('./routes/users');

const PORT: Number = parseInt(<string>process.env.PORT, 10) || 5000;
const DB_CONNECTION: string = (<string>process.env.DB_CONNECTION).toString();

const app: Application = express();
app.use(express.json());

app.use(cors());

// Routes
app.use('/user', userRoute);

// Connect DB
mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('DB Connected');
        app.listen(PORT, () => {
            console.log('Server is running');
        });
    });

