import StartUp from './Components/StartUp';

import Discover from './Components/Discover'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Nature from './Components/Photography/Nature';
import Universe from './Components/Photography/Universe';
import Food from './Components/Photography/Food';
import Wonderland from './Components/Photography/Wonderland';
import Wildlife from './Components/Photography/Wildlife';
import Painting from './Components/Photography/Painting';
import Car from './Components/Photography/Car/Car';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
function App() {

  return (
    <>

   {/* TAGLINE: Free for All growth */}
  <Router>
    <Routes>
     <Route path="/" element={<StartUp /> }/>
     <Route path="/discover" element={ <Discover /> }/>
     <Route path="/discover/nature" element={ <Nature/>}/>
     <Route path="/discover/universe" element={ <Universe/>}/>
     <Route path="/discover/food" element={ <Food/>}/>
     <Route path="/discover/painting" element={ <Painting/>}/>
   
     <Route path="/discover/wildlife" element={ <Wildlife/>}/>
     <Route path="/discover/wonderland" element={ <Wonderland/>}/>
     <Route path="/discover/car" element={ <Car/>}/>
     <Route path="/login" element={ <Login/>}/>
     <Route path="/signup" element={ <SignUp/>}/>
    </Routes>
    
  </Router>   
    </>
  );
}

export default App;
