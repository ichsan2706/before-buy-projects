<template>
<section>
  <Navbar></Navbar>
    <div class="container" id="bodyloginform">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form @submit.prevent="login">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email" required>
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required>
                  <label for="floatingPassword">Password</label>
                </div>
                <hr class="my-4">
                <div class="d-grid">
                  <button  class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign in</button>
                </div>
                <hr>
                <div class="form-text">Don't have account? Register <router-link to="/register">here</router-link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Login',
    components: {
        Navbar
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {email: this.email, password: this.password})
        }
    }
}
</script>

<style>

</style>