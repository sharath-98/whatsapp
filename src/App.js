import { Fragment, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Leftpane from './Leftpane';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="app">
        {
          !user? (
            <Login/>
          ):
          (
            <div className='appBody'>
              <Leftpane/>
              <Routes>
                <Route path='/users/:userId' element={
                    <Fragment>
                      <Chat/>
                    </Fragment>
                }>
                </Route>
                <Route path='/' element={
                  <Fragment>
                    <Chat/>
                  </Fragment>
                }>
                </Route>
              </Routes>
            </div>
          )
        }
        
    </div>
    </Router>
  );
}

export default App;
