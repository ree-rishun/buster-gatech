import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyCmLNg5j9W8XBqUhe6taCO0nrydBH--n7s',
  authDomain: 'buster-gatech.firebaseapp.com',
  databaseURL: 'https://buster-gatech.firebaseio.com',
  projectId: 'buster-gatech',
  storageBucket: 'buster-gatech.appspot.com',
  messagingSenderId: '170992726491',
  appId: '1:170992726491:web:7cb1cebd308b67748db7fe',
  measurementId: 'G-TL8Y67LYX5'
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
