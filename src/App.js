import {Route} from 'react-router-dom';
import './App.css';
import Signup from './screens/Signup/signup';
function App() {
  return (
   <>
   <Route exact path="/signup" component={Signup}/>
   
   </>
  );
}

export default App;
