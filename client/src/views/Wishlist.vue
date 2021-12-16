<template>
<div>
    <Navbar></Navbar>
    <div class="d-flex justify-content-center pt-5">
        <h3 class="text-white">Wishlist</h3>
    </div>
    <div class="container mt-5">
        <div class="row mx-auto">
            <CardWishlist
            ></CardWishlist>
        </div>  
    </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CardWishlist from  '../components/CardWishlist.vue'
export default {
    name: 'Wishlist',
    components: {
        Navbar,
        CardWishlist
    },
    computed: {
        wishlists() {
            return this.$store.state.wishlists
        }
    },
    created() {
        this.$store.dispatch('fetchWishlist')
    }
}
</script>

<style>

</style>