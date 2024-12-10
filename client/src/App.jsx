import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRecord from './components/CreateRecord';
import EditRecord from './components/EditRecord';
import RecordList from './components/RecordList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>MERN CRUD Application</h1>
        <Routes>
          <Route path="/" element={<RecordList />} />
          <Route path="/create" element={<CreateRecord />} />
          <Route path="/edit/:id" element={<EditRecord />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
