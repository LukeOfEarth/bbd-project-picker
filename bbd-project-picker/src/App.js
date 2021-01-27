import ProjectsWrapper from './components/projectWrapper';
import './App.css';
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
import { useRecoilState } from 'recoil';
import { session_id } from './shared/global-state';

function App() {
  const [sessionId,setSessionId] = useRecoilState(session_id);

  function onSessionEntered(id){
    console.log('onSessionEntered called with id of: '+id);
    setSessionId(id);
    console.log(sessionId);
  }

  return (
    <SocketProvider id={sessionId}>
      {console.log(sessionId)}
      <Header />
      <Navigation />
      <BrowserRouter>
        <Switch>

          <Login path="/login" component={Login} />

          <Route path="/" component={() => <JoinedSession onSessionEntered={onSessionEntered}/>}  exact />

          <Route path="/session" component={StartSession}/>

          <Route path="/project" render={() => <ProjectsWrapper sessionId={session_id}/>

          } />
        </Switch>
      </BrowserRouter>
      {/* <Footer/> */}
    </SocketProvider>
  );
}

export default App;
