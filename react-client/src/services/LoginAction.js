import { Redirect, BrowserRouter as Router } from 'react-router-dom';

export default {
  loginUser: (jwt) => {
    localStorage.setItem('jwt', jwt);
  }
}
