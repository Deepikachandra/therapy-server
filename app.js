import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {videoToken} from './token'

//Import Routes
import postRoutes from './routes/posts';

const app =  express();
dotenv.config();

const config =  {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  apiKey: process.env.TWILIO_API_KEY,
  apiSecret: process.env.TWILIO_API_SECRET
}

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//ROUTES
app.use('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});

app.use('/posts', postRoutes);

app.get('/',(req,res)=>{
  res.send('We are home');
});

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

const PORT = process.env.PORT || 5000;
//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
 { useNewUrlParser: true,useUnifiedTopology: true })
 .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
 .catch((error) => console.log(error.message));

 mongoose.set('useFindAndModify', false);

//HOW DO WE START LISTENING
