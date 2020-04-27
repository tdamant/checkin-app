import React, {Fragment} from 'react';
import {SubmitCheckin} from "./pages/submitCheckin";
import {BrowserRouter, Route} from "react-router-dom";
import {ViewResults} from "./pages/viewResults";

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
        <ViewResults userId={userId}/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
