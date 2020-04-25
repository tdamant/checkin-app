import React, {Fragment} from 'react';
import './App.css';
import {SubmitCheckin} from "./components/submitCheckin";
import {BrowserRouter, Route} from "react-router-dom";
import {ViewResults} from "./components/viewResults";

function App() {
  //I would want to add an actual login flow but that's outside the scope of this feature
  const userId = 'fake-user-id';
  return (
    <BrowserRouter>
      <Route exact path={'/'}>
        <Fragment>
          <SubmitCheckin userId={userId}/>
        </Fragment>
      </Route>
      <Route exact path={'/results'}>
        <ViewResults/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
