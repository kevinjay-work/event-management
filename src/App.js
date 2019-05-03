import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component{
  render(){
    return (
      <Router>
        <Route path ="/" exact component={Dashboard}/>
      </Router>
      
    );
  }
 
}

export default App;
