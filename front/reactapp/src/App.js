import React, { useEffect } from 'react';
import { fetch } from './components/Todo';
import './App.css';

function App() {
  useEffect(() => {
    fetch().then((data) => console.log(data));
  }, []);
  return <div className='App'>test</div>;
}

export default App;
