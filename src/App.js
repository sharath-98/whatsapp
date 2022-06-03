import './App.css';
import Chat from './Chat';
import Leftpane from './Leftpane';

function App() {
  return (
    <div className="app">
      <div className='appBody'>
        <Leftpane/>
        <Chat/>
      </div>
    </div>
  );
}

export default App;
