import './App.css';
import Home from "./hoc/Home/Home"
import Challenges from "./hoc/Challenges/Challenges"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className={"Navigation"}>
            <ul className={"NavElements"}>
              <li>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
              </li>

              <li>
                <Link to="/Challenges" style={{ textDecoration: 'none' }}>Challenges</Link>
              </li>

            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/Challenges">
            <Challenges />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
