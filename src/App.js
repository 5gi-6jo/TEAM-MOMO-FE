import logo from './logo.svg';
import './App.css';
import { logger } from './shared/utils';

function App() {
  logger('test');
  return (
    <div className="App">
      <div>jaksldfjlkadsjkf</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React git actions
        </a>
      </header>
    </div>
  );
}
//tesetasdf
export default App;
