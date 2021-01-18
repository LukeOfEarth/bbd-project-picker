import Project from './components/project';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <>
    <Project data={{title:'Project Title', name:'Proposer Name', desc:'Project Description'}}/>
    <Project data={{title:'Project Title', name:'Proposer Name', desc:'Project Description'}}/>
    </>
  );
}

export default App;
