<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-white ms-2" href="#">
        <img src="../assets/icon.png" style="max-height:50px"> 
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="mx-auto">
          <ul class="navbar-nav">
            <!-- <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
            </li> -->
            <li class="nav-item">
              <router-link to="/profile" class="nav-link text-white" v-if="access_token && $route.path != '/profile'" href="#"><i class="fas fa-user-circle"></i> My profile</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="me-2" v-if="access_token">
        <a @click.prevent="logout" type="button" class="nav-link text-white"><i class="fas fa-sign-out-alt"></i> Logout</a>
      </div>
      <div class="me-2" v-if="!access_token && $route.path != '/login'">
        <router-link to="/login" class="nav-link text-white"><i class="fas fa-sign-out-alt"></i> Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      access_token: localStorage.getItem('access_token')
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>