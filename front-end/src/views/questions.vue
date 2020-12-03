<template>
<div>
  <h1>Ask any questions:</h1>
    <textarea v-model="question" placeholder= "question"></textarea>
    <br />
    <button @click="addTicket">Ask</button>
<br />
<br />
  <div v-for="ticket in tickets" v-bind:key="ticket.id">
    <hr>
    <div class="ticket">
        <p id = "q">{{ticket.question}}</p>
        <p id = "a">{{ticket.answer}}</p>
    </div>
  </div>

  <div class= 'footer'>
    <div class = 'copyright'>2020 Fer Jane</div>
    <div class = 'github'><a href="https://github.com/ktaeho22/cp4.git"><img src="../../images/githubmark.png"/></a></div>
  </div>

</div>


</template>

<script>
import axios from 'axios';
export default {
  name: 'questions',
  data() {
    return {
      question: "",
      answer: "",
      tickets: [],
    }
  },
  created() {
  this.getTickets();
  },
  methods: {
    async getTickets(){
    let response = await axios.get("/api/tickets");
    this.tickets = response.data;
    return true;
    },
    async addTicket() {
    await axios.post("/api/tickets", {
    question: this.question,
    answer: this.answer

    });

    this.getQuestions;
    window.location.reload();
    },
  },
}
</script>

<style scoped>
#q{
color:purple;
}
#a{
color:yellow;
}
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
