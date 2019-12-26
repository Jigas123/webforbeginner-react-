import React from 'react';
import {BrowserRouter as Router,Switch} from 'react-router-dom';
import './App.css';

import MainPage from '../mainPage';
import AdminPenal from '../admin/AdminPenal';
import AdminHome from '../admin/adminHome';
import TechnologyDetail from '../admin/technology/technologyDetail';
import MainHome from '../trainy/mainHome';
import TrainyTechnologyDetail from '../trainy/technology/technologyInDetail';
import TrainyRecord from '../admin/table/trainyRecord';
import CustomRoute from '../customRoute';

function App() {
    const admin = "1"
    const user = "0"
  return (
      <Router>
    <div className="App">
        <Switch>
            <CustomRoute exact path = "/" component={MainPage}/>
            <CustomRoute exact path = "/admin" component={AdminPenal}/>
            <CustomRoute cprivate crole={[admin]} exact path = "/admin/home" component={AdminHome}/>
            <CustomRoute cprivate crole={[admin]} path = "/admin/technology" component={TechnologyDetail}/>
            <CustomRoute cprivate crole={[admin]} path = "/admin/technology:id" component={TechnologyDetail}/>
            <CustomRoute cprivate crole={[admin]} path = "/admin/trainyrecord" component={TrainyRecord}/>
            <CustomRoute cprivate crole={[user]} exact path = "/trainy/home" component={MainHome}/>
            <CustomRoute cprivate crole={[user]} path = "/trainy/technology/:id" component={TrainyTechnologyDetail}/>
        </Switch>
    </div>
      </Router>
  );
}

export default App;
