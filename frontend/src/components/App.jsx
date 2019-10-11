import { hot } from 'react-hot-loader/root';
import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Web from '../routes/Web';
import '../style/app.css';

const App = () => (
    <Router>
      <div style={{ margin: '25px 200px' }}>
        <Header />
        <div style={{
          borderTop: 'solid black 3px',
          borderBottom: 'solid black 3px',
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10
        }}>
          <Web/>
        </div>
        <Footer />
      </div>
    </Router>
  );
  
  export default hot(App);