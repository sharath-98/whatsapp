import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Leftpane from './Leftpane';

function App() {
  return (
    <Router>
      <div className="app">
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
    </div>
    </Router>
  );
}

export default App;
