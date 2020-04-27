import {Checkin, CheckinSummary} from "../types";
import React, {Fragment} from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 24px;
  width: 650px;
  text-align: center;
`;

const AllCheckins = styled.div`
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  margin: 24px auto;
`;

const GridCell = styled.div<{ columnNumber: number, borderBottom?: boolean }>`
  margin-right: 8px;
  grid-column: ${props => props.columnNumber} / ${props => props.columnNumber};
  ${props => props.borderBottom ? 'border-bottom: 1px solid grey;' : ''}
`;

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const CheckinGridHeaders = () => {
  return (
    <Fragment>
      <GridCell borderBottom={true} columnNumber={1}>Created At</GridCell>
      <GridCell borderBottom={true} columnNumber={2}>Mood (1 - 7)</GridCell>
      <GridCell borderBottom={true} columnNumber={3}>Feeling</GridCell>
      <GridCell borderBottom={true} columnNumber={4}>Comment</GridCell>
    </Fragment>
  )
};


export const DisplayCheckins = ({checkinSummary}: { checkinSummary: CheckinSummary }) => {
  return (
    <Container>
      <Summary>
        <div>
          <h2>Number of checkins:</h2>
          <h2>{checkinSummary.checkins.length}</h2>
        </div>
        <div>
          <h2>Median mood:</h2>
          <h2>{checkinSummary.medianMood ? `${checkinSummary.medianMood}/7` : 'N/A'}</h2>
        </div>
      </Summary>
      <AllCheckins>
        <CheckinGridHeaders/>
        {checkinSummary.checkins.map((checkin: Checkin, index) => {
          return (
            <Fragment key={`checkin-${index}`}>
              <GridCell columnNumber={1}>{new Date(checkin.createdAt).toLocaleString()}</GridCell>
              <GridCell columnNumber={2}>{checkin.mood}</GridCell>
              <GridCell columnNumber={3}>{checkin.feeling.join(', ')}</GridCell>
              <GridCell columnNumber={4}>{checkin.comment || ''}</GridCell>
            </Fragment>
          )
        })
        }
      </AllCheckins>
    </Container>
  )
};
