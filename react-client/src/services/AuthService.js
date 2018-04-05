import fetch from 'node-fetch';
import LoginAction from './LoginAction'

class AuthService {
  login(user) {
    return fetch('http://localhost:3000/api/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }})
      .then(res => res.json())
      .then(json => {
        let jwt = json;
        console.log(jwt);
        LoginAction.loginUser(jwt);
        return true;
      });
  };
  
  signup(user) {
    return fetch('http://localhost:3000/api/login', {
      method: 'post',
      body: JSON.stringiy(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {})
};

  authenticate() {
    var jwt = sessionStorage.getItem('jwt');
    
  }
};

export default new AuthService();
  
