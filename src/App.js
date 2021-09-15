
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
import { Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact  path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
