import fetch from 'node-fetch';
import { isEmpty } from 'lodash';

const TOKEN_KEY = "jwt";

const AuthService = {
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
        AuthService.setToken(jwt);
      }).catch((err) => {
        console.log(err);
      });
  },
  
  signup(user) {
    return fetch('http://localhost:3000/api/login', {
      method: 'post',
      body: JSON.stringiy(user),
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
  
  getToken(tokenKey = TOKEN_KEY) {
    return AuthService.get(tokenKey);
  },
  
  validate() {
    
  },
  
  validateToken() {
    
  }
};

export default AuthService;
  
