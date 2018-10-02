import 'whatwg-fetch';
import decode from 'jwt-decode';
import { isEmpty } from 'lodash';

const TOKEN_KEY = "jwt";

const AuthService = {
  login(userInfo) {
    return fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {
        let jwt = json;
        console.log(jwt);
        AuthService.setToken(jwt);
      }).catch((err) => {
        console.log(err);
      });
  },
  
  signup(userInfo) {
    return fetch('/api/signup', {
      method: 'post',
      body: JSON.stringiy(userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {})
  },
  
  /*
  Clearing of localStorage and sessionStorage
  */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }
    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }
    return null;
  },
  
  clearToken(tokenKey = TOKEN_KEY) {
    return AuthService.clear(tokenKey);
  },
  
  /*
  Writing to localStorage and sessionStorage
  */
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
    return null;
    }
    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
    if (sessionStorage) {
      return sessionStorage.setItem(key, JSON.stringify(value));
    }
    return null;
  },
  
  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return AuthService.set(value, tokenKey, isLocalStorage);
  },
  
  /*
  Reading of localStorage and sessionStorage
  */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key)) || null;
    }
    if (sessionStorage && sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key)) || null;
    }
    return null;
  },
  
  getToken(decode = false, tokenKey = TOKEN_KEY) {
    if (decode) {
      return atob(AuthService.get(tokenKey));
    }
    else {
      return AuthService.get(tokenKey);
    }
  },
  
  isLoggedIn() {
    return new Promise((resolve) => {
      AuthService.verifyToken('jwt', isLoggedIn => {
        if (isLoggedIn) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    })
  },
  
  getTokenExpirationDate() {
    var token = decode(AuthService.getToken(true));
    if (!token) {
      return null
    }
    var date = new Date();
    date.setUTCSeconds(token.exp);
    return date;
  },
  
  isTokenExpired() {
    var tokenDate = AuthService.getTokenExpirationDate();
    return tokenDate < new Date();
  },
  
  getUserData() {
    var token = decode(AuthService.getToken(true));
    var userInfo = {
      surname: token.sub,
      permission: token.perm,
      validFrom: token.iat,
      validTo: token.exp
    };
    console.log(userInfo);
    return userInfo;
  },

  verifyToken(tokenKey = TOKEN_KEY, callback) {
    var token = AuthService.getToken(false, tokenKey);
    
    if (!token) {
      callback(false, null);
    }
    
    var body = { token: token };
    
    fetch('/api/verify', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        if (response.success) {
          callback(true, null);
        }
        else {
          callback(false, response.message);
        }
      })
  }
};

export default AuthService;
  
