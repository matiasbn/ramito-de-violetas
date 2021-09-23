import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { AppProvider } from './store';
import { Home } from './views/Home';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <NavBar />
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;
