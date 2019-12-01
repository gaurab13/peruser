import React from 'react';
import TopBar from './components/TopBar';
import 'bootstrap/scss/bootstrap.scss';

const App: React.FC = () => {
  return (
    <div className="topbar" id="topbar">
      <TopBar />
    </div>
  );
}

export default App;
