import firebase from 'firebase'

import 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBhY4oZHA7hW20GZ61ullpx8ei_ixnzRjE',
  authDomain: 'theethawatapp.firebaseapp.com',
  databaseURL: 'https://theethawatapp.firebaseio.com',
  projectId: 'theethawatapp',
  storageBucket: 'theethawatapp.appspot.com',
  messagingSenderId: '657980256737',
  appId: '1:657980256737:web:d55374962b1e5354',
}

const app = firebase.initializeApp(firebaseConfig)
export default app
