import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

axios.defaults.baseURL = 'https://games-project-vue.herokuapp.com'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    games: [],
    wishlists: [],
    gameDetails: '',
    transactionToken: '',
    history: []
  },
  mutations: {
    SET_GAMES(state, payloads) {
      state.games = payloads
    },
    SET_DETAILS(state, payloads) {
      state.gameDetails = payloads
    },
    SET_WISHLIST(state, payloads) {
      state.wishlists = payloads
    },
    SET_PROFILE(state, payloads) {
      state.profile = payloads
    },
    SET_PAYMENT(state, payload) {
      state.transactionToken = payload
    },
    SET_HISTORY(state, payload) {
      state.history = payload
    }
  },
  actions: {
    fetchGames(context, payload) {
      axios({
        method: 'GET',
        url: `https://api.rawg.io/api/games?key=c97772a04b5d489683a97366f2207b6a`
      })
      .then((data) => {
        context.commit('SET_GAMES', data.data.results)
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchGames2(context, payload) {
      axios({
        method: 'GET',
        url: `https://api.rawg.io/api/games?key=c97772a04b5d489683a97366f2207b6a&page=2`
      })
      .then((data) => {
        context.commit('SET_GAMES', data.data.results)
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchGames3(context, payload) {
      axios({
        method: 'GET',
        url: `https://api.rawg.io/api/games?key=c97772a04b5d489683a97366f2207b6a&page=3`
      })
      .then((data) => {
        context.commit('SET_GAMES', data.data.results)
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchDetails(context, id) {
      axios({
        method: 'GET',
        url: `https://api.rawg.io/api/games/${id}?key=c97772a04b5d489683a97366f2207b6a`
      })
      .then((data) => {
        context.commit('SET_DETAILS', data)
        console.log(data);
        console.log(data.id);
        console.log(data.data.id);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    register(context, payload) {
      axios({
        method: 'POST',
        url: '/user/register',
        data: payload
      })
      .then((data) => {
        router.push({path:'/login'})
        Swal.fire(
          'Success register!',
          'Ok to continue',
          'success'
        )
      })
      .catch(err => {
        Swal.fire(
          'Please check your identity',
          `You must fill all the form`,
          'error'
        )
      })
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/user/login',
        data: payload
      })
      .then(({data}) => {
        console.log(data);
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('id', data.id)
        router.push({path:'/'})
        Swal.fire(
          'Success login!',
          'Ok to continue',
          'success'
        )
      })
      .catch((err) => {
        Swal.fire(
          'Please check your identity',
          `Username/password is wrong
          register if you dont have account.`,
          'error'
        )
      })
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('id')
      this.dispatch('fetchGames')
      router.push({path:'/login'})
      Swal.fire(
        'Success logout!',
        'Ok to continue',
        'success'
      )
    },
    fetchWishlist(context, payloads) {
      axios({
        method: 'GET',
        url: '/profile/favorites',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((data) => {
        console.log(data);
        context.commit('SET_WISHLIST', data)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    addWishlist(context, data) {
      console.log(data.id);
      axios({
        method: 'POST',
        url: `/profile/favorite/${data.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          gameId: data.id,
          userId: localStorage.id,
          name: data.name,
          image: data.image,
          description: data.description
        }
      })
      .then((data) => {
        console.log(data);
        Swal.fire(
          'Success add this item to your wishlist!',
          'Ok to continue',
          'success'
        )
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This item is already in your wishlist'
        })
      })
    },
    profile(context, data) {
      axios({
        method: 'GET',
        url: '/profile',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        data.favorites.description
        context.commit('SET_PROFILE', data)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    edit(context, data) {
      let id = localStorage.getItem('id')
      axios({
        method: 'PUT',
        url: `/profile/edit/${id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: data
      })
      .then((data) => {
        console.log(data);
        this.dispatch('profile')
        router.push({path: '/profile'})
        Swal.fire(
          'Success updating profile!',
          'Ok to continue',
          'success'
        )
      })
      .catch(err => {
        console.log(err);
      })
    },
    delete(context, id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'DELETE',
            url: `/profile/favorite/${id}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
          .then(() => {
            this.dispatch('profile')
            router.push({path: '/profile'})
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
            )
          }
        })
      .catch(err => {
          console.log(err);
      })
    },
    payment(context, id) {
      axios({
        method: 'GET',
        url: `/midtrans/${id}`,
        headers: {
          access_token: localStorage.access_token
        }  
      })
      .then((transaction) => {
        console.log(transaction.data.token);
        context.commit('SET_PAYMENT', transaction.data.token)
        snap.pay(transaction.data.token, {
          onSuccess: function(result) {
            console.log("SUCCESS", result);
            Swal.fire(
                'Payment is complete!',
                'Ok to continue',
                'success'
            )
          },
          onPending: function(result) {
            console.log("Payment pending", result);
            Swal.fire(
                'Transaction is pending. . .',
                'Please check your sandbox',
                'info'
            )
          },
          onError: function() {
            console.log("Payment error");
            Swal.fire(
                'Huft something wrong happen ☹️',
                'There is a bug that we need to catch 🐛',
                'error'
            )
          }
        });
      })
      .catch(err => {
        Swal.fire(
          'Huft something wrong happen ☹️',
          'There is a bug that we need to catch 🐛',
          'error'
      )
      })
    },
    history(context, payload) {
      axios({
        method: 'GET',
        url: '/profile/history',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then((data) => {
        console.log(data);
        context.commit('SET_HISTORY', data.data)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  modules: {
  }
})
