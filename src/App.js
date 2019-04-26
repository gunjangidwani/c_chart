import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import uploadfile from './component/uploadfile'
import appStore from './store/store'
import ShowChart from './component/showChart';

function App() {
  return (
    <React.Fragment>
      <Provider store={appStore()}>
          <Router>
            <Switch>
              <Route exact path="/" component={uploadfile} />
            </Switch>
          </Router>
          <ShowChart />
      </Provider>

    </React.Fragment>
  );
}

export default App;
