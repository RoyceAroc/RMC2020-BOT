import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './nav-component/index.js';
import updateDocument from './updateDocument';
import reportWebVitals from './reportWebVitals';
import logo from './assets/img/logo.png';
import puppeteer from require('puppeteer');

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="*">
          <NoPage />
        </Route>         
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

function Home() {
  updateDocument('Home');
  return <div> <h2>Home</h2> <h5> Does SEO even work? Well it should lol </h5> </div>;
}

function Dashboard() {
  updateDocument('Dashboard');
  return <h2>Dashboard</h2>;
}

function NoPage() {
  return <h2>404 Page Not Found</h2>;
}

  
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });
    await browser.close();
})();