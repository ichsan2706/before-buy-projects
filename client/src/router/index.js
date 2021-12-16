import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DetailCard from '../components/DetailCard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Wishlist from  '../views/Wishlist.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'
import ProfileAccount from '../components/ProfileAccount.vue'
import ProfileWishlist from '../components/ProfileWishlist.vue'
import EditProfile from '../views/EditProfile'
import ProfileHistory from '../components/ProfileHistory.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: DetailCard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: 
    [
      {
        path: 'account',
        component: ProfileAccount
      },
      {
        path: 'wishlist',
        component: ProfileWishlist
      },
      {
        path: 'edit',
        component: EditProfile
      },
      {
        path: 'history',
        component: ProfileHistory
      }
    ]
  },
  {
    path: '*',
    name: 'Not found',
    component: NotFound
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login' && localStorage.access_token) next({ name: 'Home' })
  if (to.name == 'Wishlist' && !localStorage.access_token) {
    next({ name: 'Login' })
    Swal.fire('Please login first')
  }
  if (to.name == 'Register' && localStorage.access_token) next({ name: 'Home'})
  else next()
  if(to.name == 'Not found') {
    Swal.fire(
      'Are you lost?',
      'Page you looking for is not found :(',
      'question'
    )
  }
})

export default router
