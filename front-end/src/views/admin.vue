<template>
<div>
  <div v-for="ticket in tickets" v-bind:key="ticket.id">

    <div class="ticket">
        <p id = "q">{{ticket.question}}</p>

        <textarea v-model= "ticket.answer"></textarea>
        <br>

        <button @click="editTicket(ticket)">Answer Question</button>
        <button @click="deleteTicket(ticket)">Delete Question</button>
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
  name: 'admin',
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


    async editTicket(ticket) {
    await axios.put("/api/tickets/" + ticket._id, {
    question: ticket.question,
    answer: ticket.answer,

    });

    this.getTickets();
    window.location.reload();
    return true;
    },

    async deleteTicket(ticket) {
     await axios.delete("/api/tickets/" + ticket._id);
     this.getTickets();
     return true;
    }
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
