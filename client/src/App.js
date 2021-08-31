import React,{ useReducer, useState,createContext } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

// import Navbar1 from './components/navbar';

import Unresolved from './components/unresolved';
import signup from './components/signup';
import signin from './components/signin';
import DoubtPage from './components/doubtPage';
import AcceptedDoubt from './components/acceptedDoubt';
import StudentHome from './components/studentHome';
import CreateDoubt from './components/createDoubt';
import TaDetails from './components/taDetails';
import Navbar from './components/Navbar'

import {initialState,reducer} from '../src/reducers/RoleReducer'
 import Home from './components/Home';
// import registrantsDetails from './components/registrantsDetails';
// import AllRegistrants from './components/allRegistrants';
export const RoleContext=createContext();

const App= (props) => {
  
  // const reducer
  
const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <RoleContext.Provider value={{state,dispatch}}>
    
    
    <Router>
    
    <Route path="/"  component={Navbar}/>
      <Switch>
       
        <Route path="/" exact component={Home}/>
        <Route path="/doubtPage" exact component={DoubtPage}/>
        <Route path="/signup" exact component={signup}/>
        <Route path="/signin" exact component={signin}/>
         <Route path="/acceptedDoubt" exact component={AcceptedDoubt}/> 
         <Route path="/student/home" exact component={StudentHome}/> 
         <Route path="/student/createDoubt" exact component={CreateDoubt}/> 
         <Route path="/ta/report" exact component={TaDetails}/>
         <Route path="/ta/unresolved" exact component={Unresolved}/>
         
     
      </Switch>
    </Router>
   
    </RoleContext.Provider>
    </div>
  );
}

export default App;