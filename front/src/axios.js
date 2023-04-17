import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081',
});

// const instance = axios.create({
//   baseURL: "https://gemgarden.herokuapp.com",
// });


export default instance;