import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Restaurants, Foods, Orders } from './containers/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/restaurants/:restaurantsId/foods' element={<Foods />} />
      </Routes>
    </Router>
  );
}

export default App;
