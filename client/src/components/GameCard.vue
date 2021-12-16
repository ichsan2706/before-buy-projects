<template>
<div class="col-md-3 mb-5">
<div class="card text-white bg-dark mb-3 rounded" style="max-width: 18rem;">
    <img :src="game.background_image" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">{{game.name}}</h5>
    <p class="card-text"></p>
  </div>
  <div class="d-grid gap-2">
  <button @click.prevent="details(game.id)" class="btn bg-dark bg-gradient text-white" type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Get details">Details</button>
  </div>
</div>
</div>
</template>

<script>
export default {
    name: 'GameCard',
    props: ['game'],
    methods: {
        details(id) {
            this.$router.push({path: `/details/${id}`})
        }
    }
}
</script>

<style>

</style>