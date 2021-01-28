import './App.css';
import Room from './components/room'
import JoinedSession from './components/joinSession';
import StartSession from './components/startSession';
import Header from './components/Common/header';
import { SocketProvider } from './contexts/socket-provider';
import Navigation from './components/Common/navigation';
import Login from './components/login'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let sessionId = null;

  function onSessionEntered(id){
    sessionId = id;
  }

  return (
    <SocketProvider id={sessionId}>
      <Header />
      <Navigation />
      <BrowserRouter>
        <Switch>

          <Login path="/login" component={Login} />

          <Route path="/list" component={() => <JoinedSession onSessionEntered={onSessionEntered}/>}  exact />

          <Route path="/session" component={StartSession}/>

          <Route path="/project" render={() => <Room/>

          } />
        </Switch>
      </BrowserRouter>
      {/* <Footer/> */}
    </SocketProvider>
  );
}

export default App;
