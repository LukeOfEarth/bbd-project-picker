import ProjectsWrapper from './components/projectWrapper';
import Navbar from './components/navbar';
import {RecoilRoot} from 'recoil';
import './App.css';


function App() {
  return (
    <RecoilRoot>
      <Navbar/>
      <ProjectsWrapper/>
    </RecoilRoot>
  );
}

export default App;
