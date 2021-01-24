import ProjectsWrapper from './components/projectWrapper';
import Navbar from './components/navbar';
import { SocketProvider } from './contexts/socket-provider';
import {RecoilRoot} from 'recoil';
import './App.css';


function App() {
  return (
    <RecoilRoot>
      <SocketProvider id={0}>
        <Navbar/>
        <ProjectsWrapper/>
      </SocketProvider>
    </RecoilRoot>
  );
}

export default App;
