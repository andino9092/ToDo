import React, {Component} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import List from './components/List';
import AddPage from './components/AddPage';

export default class App extends Component{
  
  render(){

      return (
        <Router>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
          <link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'></link>
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="/List">TODO</a>
            </div>
                <ul class="nav navbar-nav">
                  <li>
                    <Link to="/List">
                      HomePage    
                    </Link>
                  </li>
                  <li>
                    <Link to="/add">
                    <span class="glyphicon glyphicon-plus-sign"/>
                  </Link>
                  </li>
                </ul>
              </div>
            </nav>
          <Routes>
            <Route path = "/List" element={<List/>}/>
            <Route path = "/add" element={<AddPage history={this.props.history}/>}/>
          </Routes>
        </Router>
    )}
}

/**
 * next goal:
 * add style to everything
 * add nav bar DONE
 * add editing option
 */