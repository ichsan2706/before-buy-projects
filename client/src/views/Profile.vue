<template>
<section>
 <Navbar></Navbar>
        <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img :src="profile.avatar" alt=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                            <h5>
                                {{profile.username}}
                            </h5>
                            <h6>
                                {{profile.email}}
                            </h6><br><br><br><br><br>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <router-link to="/profile/account" class="nav-link nested">Account</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/profile/wishlist" class="nav-link nested">Wishlist</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/profile/history" class="nav-link nested">History</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <router-link to="/profile/edit" type="button" class="btn btn-dark text-white">Edit</router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-8">
                        <router-view/>
                    </div>
                </div>
            </form>           
        </div>
</section>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    name: 'Profile',
    components: {
        Navbar
    },
    computed: {
        profile() {
            return this.$store.state.profile
        }
    },
    created() {
        this.$store.dispatch('profile')
    },
    updated() {

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