import ProjectsWrapper from './components/projectWrapper';
import './App.css';
import JoinedSession from './components/joinSession';
import StartSession from './components/startSession';
import Header from './components/Common/header';
import {SocketProvider} from './contexts/socket-provider';
import Navigation from './components/Common/navigation';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';


function App() {
  return (
    <SocketProvider id={0}>
      <Header/>
      <Navigation/>
      <BrowserRouter>
          <Switch>
            <Route path="/" component={JoinedSession} exact/>

            <Route path="/session" component={StartSession} />

            <Route path="/project"  render = {() => <ProjectsWrapper/>
          
          }/>
          </Switch>
      </BrowserRouter>
      {/* <Footer/> */}
    </SocketProvider>
  );
}

export default App;
