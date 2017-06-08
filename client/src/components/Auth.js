import axios from 'axios';

// Auth object o send a call back to the express server to check if user
// is logged in

const Auth = {
  getUser: (cb) => {
    axios.get('/getUser')
      .then((res) => {
        cb(res.data);
      })
      .catch((error) => {
        cb(error);
      });
  }
}

export default Auth;
