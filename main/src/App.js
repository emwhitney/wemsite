import React from 'react';
import './App.css';
import Header from './Header';
import RoutesTree from './RoutesTree';

function App() {
  return (
    <div className="App">
        <div className='content'>
          <Header />
          <RoutesTree />
        </div>
    </div>
  );
}

export default App;
