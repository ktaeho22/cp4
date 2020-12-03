const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qna', {
  useUnifiedTopology: true,
useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
question: String,
answer: String,

});


const Ticket = mongoose.model('Ticket', itemSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.post('/api/tickets', async(req, res) =>{
  const ticket = new Ticket({
    question: req.body.question,
    answer : req.body.answer,
  });
  try {
    await ticket.save();
    res.send(ticket);
  } catch(error){
    res.sendStatus(500);
  }
});

app.get('/api/tickets', async(req,res) => {
  try {
    let tickets = await Ticket.find();
    res.send(tickets);
  } catch (error) {
    res.sendStatus(500);
  }
})


app.put('/api/tickets/:id', async(req,res)=> {
  try{
    let ticket = await Ticket.findOne({
      _id: req.params.id
    });
    ticket.question = req.body.question;
    ticket.answer = req.body.answer;
    await ticket.save();
    res.send(ticket);

  } catch(error) {
    res.sendStatus(500);
  }
})

app.delete('/api/tickets/:id', async(req,res)=> {
  try{
    await Ticket.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  }catch(error) {
    res.sendStatus(500);
  }
})



app.listen(3000, () => console.log('Server listening on port 3000!'));
