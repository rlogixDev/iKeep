
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
import { Route, Switch, Link, Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        {/* <Route exact path="/" component={Header} /> */}
        <Route exact  path="/login" component={Login} />
      </Switch>
      {/* <Login/> */}
    </div>
  );
}

export default App;
