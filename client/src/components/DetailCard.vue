<template>
<div>
    <Navbar></Navbar>
        <div class="card mx-auto mb-5 p-5 mt-5" style="max-width: 55rem; max-height: 100rem">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img :src="details.data.background_image" class="card-img h-100" style="object-fit: cover;" >
                </div>
                <div class="col-md-8">
                    <div class="d-grid gap-2 p-2 position-absolute top-0 end-0">
                        <router-link to="/" type="button" class="btn btn-dark">Back to all games</router-link>
                    </div>
                    <h5 class="card-title">{{details.data.name}}</h5>
                    <div class="card-body">
                    <div class="card-text">Released: {{details.data.released}}</div>
                    <div class="card-text">GameId: {{details.data.id}}</div>
                    <div class="item-except text-muted text-sm h-1x">{{details.data.description}}</div>
                    <a type="button" class="card-action m-1" @click.prevent="addWishlist({id: details.data.id, name: details.data.name, image: details.data.background_image, description: details.data.description})"><i class="fa fa-heart"></i></a>
                    <!-- <div class="card-text"></div> -->
                    </div>
                    <div class="d-grid col-6 mx-auto">
                    </div>
                        <button @click.prevent="midtrans(details.data.id)" class="btn btn-outline-dark" type="button"><i class="fab fa-cc-visa"></i> Purchase Rp.300.000</button>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
export default {
    name: 'DetailCard',
    components: {
        Navbar
    },
    data() {
        return {
            token:''
        }
    },
    methods: {
        addWishlist(data) {
            if(localStorage.access_token) {
                this.$store.dispatch('addWishlist', data)
            } else {
                this.$router.push({path: '/login'})
                Swal.fire('Please login first')
            }
        },
        midtrans(id) {
            this.$store.dispatch('payment', id)
        }
    },
    computed: {
        details() {
            return this.$store.state.gameDetails
        }
    },
    created() {
        this.$store.dispatch('fetchDetails', this.$route.params.id)
    }

}
</script>

<style>

</style>
