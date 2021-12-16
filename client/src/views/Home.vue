<template>
<section>
  <Navbar
  
  ></Navbar>
    <div class="text-center text-white mt-5">
      <h2>NOTES!!!</h2><hr/>
      <div>
        To pay using midtrans is only available with debt/credit card (first option) only!<br>
        Default card payment: <br>
        Card Number : 4811 1111 1111 1114<br>
        CVV : 123<br>
        EXP MONTH/YEAR : 02/2025<br>
        OTP/3DS : 112233 <br>
        <h5>To buy games just go to games detail and click buy</h5>
      </div><hr>
    </div><br><br>
  <Carousel
  :games="games"
  ></Carousel>
    <div class="text-center text-white mt-5">
      <h3>Trending Games in 2021</h3>
    </div><br><br>
    <div class="container">
          <div class="row">
            <GameCard
            v-for="game in games"
            :key="game.id"
            :game="game"
            ></GameCard>
          </div>  
    </div>
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a  @click="firstPage" type="button" class="page-link nested">1</a>
    </li>
    <li class="page-item">
      <a @click="secondPage" type="button" class="page-link nested">2</a>
    </li>
    <li class="page-item">
      <a @click="thirdPage" type="button" class="page-link nested">3</a>
    </li>
  </ul>
</nav>
</section>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Carousel from '../components/Carousel.vue'
import GameCard from '../components/GameCard.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    GameCard
  },
  methods: {
    firstPage() {
      this.$store.dispatch('fetchGames')
    },
    secondPage() {
      this.$store.dispatch('fetchGames2')
    },
    thirdPage() {
      this.$store.dispatch('fetchGames3')
    }
  },
  computed: {
    games() {
      return this.$store.state.games
    }
  },
  created() {
     this.$store.dispatch('fetchGames')
  }
}
</script>

<style scoped>
.nested:hover{
    color: red
}
.nested:focus{
    color:black
}
</style>