import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getPsalms } from '../utils/chucknorris-api';


class getPsalms extends Component {

  constructor() {
    super()
    this.state = { psalms: [] };
  }

  getPsalms() {
    getPsalms().then((psalms) => {
      this.setState({ psalms });
    });
  }

  componentDidMount() {
    this.getPsalms();
  }

  render() {

    const { psalms }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Psalms from db</h3>
        <hr/>

        { jokes.map((joke, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">#{ joke.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { joke.joke } </p>
                  </div>
                </div>
              </div>
          ))}

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>Get Access to other functions</h2>
          </div>
        </div>

        <div className="col-sm-12">
            <div className="jumbotron text-center">
              <h2>Other functions :)</h2>
              <Link className="btn btn-lg btn-success" to='/special'> Other functions </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default getPsalms;
