require ('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/User')
const connectDB = require('./connect')

const app = express()
const port = 3000

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch(err){
        console.log(err);
    }
}

start()

app.post("./models/user", 
async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
)

app.get('./models/User', async (req, res) => {
    try {
      const user = await User.find();
      res.send(Users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('./models/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!record) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.patch('/records/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete a record by ID
  app.delete('/records/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });