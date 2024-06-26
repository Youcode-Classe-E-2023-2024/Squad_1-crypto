import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketList from './components/MarketList';
import AssetList from './components/AssetList';
import ExchangeList from './components/ExchangeList';
import AssetDetail from './components/AssetDetail';
import ExchangeDetail from './components/ExchangeDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MarketList />} />
        <Route path="/assets" element={<AssetList />} />
        <Route path="/exchanges" element={<ExchangeList />} />
        <Route path="/asset/:id" element={<AssetDetail />} />
        <Route path="/exchange/:id" element={<ExchangeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
