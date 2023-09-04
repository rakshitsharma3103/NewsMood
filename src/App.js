import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = ()=> {
  //first the JSX is converted into HTML to display and then this render function perforrm operation.
  const apiKey = process.env.REACT_APP_NEWS_API     //here i am getting my api key by .env.local file so that no one can use it except me :)

  const [progress, setProgress] = useState(0)
   
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />
        <Switch>
        <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country="in" category="general"/></Route>                    {/*here i used props(pageSize) as i am using it as variable so i can change the pageSize/country/other terms directly from here */}
        <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} country="in" category="business"/></Route>             
        <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={6} country="in" category="entertainment"/></Route>             {/*if i dont use keys then when i navigate on categories then until i reload the page the content not change */}
        <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="in" category="general"/></Route>                              {/*here we have used unique keys so that when we click on each diff termms in navbar then the page remount(vapas se category change krni h click krne pr) and the clicked content shows up */}
        <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} country="in" category="health"/></Route>                    
        <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} country="in" category="science"/></Route>                   
        <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} country="in" category="sports"/></Route>                    
        <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} country="in" category="technology"/></Route>          

        </Switch>
        </Router>
      </div>
    )
  
}

export default App;