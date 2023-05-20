import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_LOCAL_STORE,
});

// const instance = axios.create({
//   baseURL: process.env.VUE_APP_PROD_STORE,
// });


export default instance;