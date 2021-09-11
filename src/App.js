
import './App.css';
import Home from './components/home';
import Header from './components/layouts/header';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import AuthProvider from './context/authContext';
import Footer from './components/layouts/footer';
import SignUp from './components/auth/SignUp';
import Create from './components/createReq';
import Chart from './components/chart'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider> 

    <Header/>
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/signup">
      <SignUp/>
    </Route>
    <Route exact path="/create">
      <Create/>
    </Route>
    <Route exact path="/chart">
      <Chart/>
    </Route>
    </Switch>
    <Footer/>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
