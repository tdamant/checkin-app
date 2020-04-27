import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {CheckinSummary} from "../types";
import {fetchCheckins} from "../api";
import {LoadingSpinner} from "../components/loadingSpinner";
import styled from "styled-components";
import {GenericButton} from "../components/genericButton";
import {DisplayCheckins} from "../components/displayCheckins";

const Error = styled.div`
  font-size: 18px;
  margin: 8px;
`;

const Container = styled.div`
  align-items: center;
  margin: 24px;
  display: flex;
  flex-direction: column;
`;

export const ViewResults = ({userId}: {userId: string}) => {
  const history = useHistory();
  const [checkinSummary, setCheckinSummary] = useState<CheckinSummary>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);

  const getCheckinsFromApi = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetchCheckins(userId);
      setIsLoading(false);
      if(response.error) {
        return setError(true)
      }
      setCheckinSummary(response.result)
    }, 1000);
  };

  useEffect(() => {
    getCheckinsFromApi()
  }, []);
  return (
    <Container>
      {isLoading && <LoadingSpinner/>}
      {error && <Error>Oops Something went wrong - please try again later!</Error>}
      {checkinSummary && <DisplayCheckins checkinSummary={checkinSummary}/>}
      {!isLoading && <GenericButton css='width: 200px;'onClick={() => history.push('/')} text='Submit another checkin'/>}
    </Container>
  )
};
