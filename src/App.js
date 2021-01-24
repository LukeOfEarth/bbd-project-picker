import Project from './components/project';
import './App.css';
import JoinedSession from './components/joinSession';
import StartSession from './components/startSession';
import Header from './components/Common/header';
// import Footer from './components/Common/footer';
import Navigation from './components/Common/navigation';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <Header/>
    <Navigation/>
    <BrowserRouter>
        <Switch>
          <Route path="/" component={JoinedSession} exact/>

          <Route path="/session" component={StartSession} />

          <Route path="/project"  render = {() => <Project data={{title:'Project Title', name:'Proposer Name', desc:'Project Description'}}/>
        
        }/>
        </Switch>
    </BrowserRouter>
    {/* <Footer/> */}
    </>
  );
}

export default App;
