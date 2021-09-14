import React, { Suspense } from 'react';
import { Route } from 'react-router';
import './App.css';

const SignupComponent = React.lazy(() => import ('./screens/Signup/signup'));

function App() {
  return (
   <>
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <Route path="/signup" component={SignupComponent}/>
      </Suspense>
    </div>
  
   
   </>
  );
}

export default App;
