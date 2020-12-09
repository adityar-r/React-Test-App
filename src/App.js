import logo from './logo.svg';
import './App.css';
import {Switch,Route } from "react-router-dom";

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

function App() {
  return (
    <div className="App">
      {/* <Page1/> */}
    <Switch>
      <Route path="/home" component={Page1} exact/>
      <Route path="/time" component={Page2} exact/>
      <Route path="/data" component={Page3} exact/>
      <Route path="/currency" component={Page4} exact/>
    </Switch>
      {/* <Page1/> */}
    </div>
  );
}

export default App;
