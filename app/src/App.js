// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MarketList from './components/MarketList';
import AssetList from './components/AssetList';
import ExchangeList from './components/ExchangeList';
import MarketDetail from './components/MarketDetail';
import AssetDetail from './components/AssetDetail';
import ExchangeDetail from './components/ExchangeDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MarketList} />
        <Route exact path="/assets" component={AssetList} />
        <Route exact path="/exchanges" component={ExchangeList} />
        <Route exact path="/market/:id" component={MarketDetail} />
        <Route exact path="/asset/:id" component={AssetDetail} />
        <Route exact path="/exchange/:id" component={ExchangeDetail} />
      </Switch>
    </Router>
  );
}

export default App;
