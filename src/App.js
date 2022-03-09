import logo from './logo.svg';
import { logger } from './shared/utils';
import Calendar from './components/Calendar';

function App() {
  logger('test');
  return (
    <div className="App">
      <Calendar />
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
          Learn React auto deploy success!
        </a>
      </header>
    </div>
  );
}
//tesetasdf
export default App;
