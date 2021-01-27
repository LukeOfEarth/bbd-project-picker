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


function App() {
  return (
    <SocketProvider id={null}>
      <Header />
      <Navigation />
      <BrowserRouter>
        <Switch>

          <Login path="/login" component={Login} />

          <Route path="/" component={JoinedSession} exact />

          <Route path="/session" component={StartSession} />

          <Route path="/project" render={() => <ProjectsWrapper />

          } />
        </Switch>
      </BrowserRouter>
      {/* <Footer/> */}
    </SocketProvider>
  );
}

export default App;
