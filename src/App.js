
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

// pages
import Home from './components/Home'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Route exact path = '/' component = {Home}> <Home /> </Route>
      </Container>
    </Router>
  );
}

export default App;
