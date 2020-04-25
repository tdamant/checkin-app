import React, {Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Checkin} from "../types";


export const ViewResults = () => {
  const history = useHistory();
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  const fetchCheckins = async () => {
    const apiResponse = await fetch('/checkins', {method: 'GET'});
    const apiBody = await apiResponse.json();
    await setCheckins(apiBody.checkins);
  };

  useEffect(() => {
    fetchCheckins()
  }, []);
  return (
    <Fragment>
      <div>Hey</div>
      {checkins[0] && <div>{checkins[0].mood}</div>}
      <button onClick={() => history.push('/')}>View previous check ins</button>
    </Fragment>
  )
};
