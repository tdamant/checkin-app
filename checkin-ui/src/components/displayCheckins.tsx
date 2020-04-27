import {Checkin, CheckinSummary} from "../types";
import React, {Fragment} from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 24px;
`;

const AllCheckins = styled.div`
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  margin: 24px auto;
`;

const GridCell = styled.div<{ columnNumber: number }>`
  margin-right: 8px;
  grid-column: ${props => props.columnNumber} / ${props => props.columnNumber};
`;

const CheckinGridHeaders = () => {
  return (
    <Fragment>
      <GridCell columnNumber={1}>Created At</GridCell>
      <GridCell columnNumber={2}>Mood (1 - 7)</GridCell>
      <GridCell columnNumber={3}>Feeling</GridCell>
      <GridCell columnNumber={4}>Comment</GridCell>
    </Fragment>
  )
};


export const DisplayCheckins = ({checkinSummary}: { checkinSummary: CheckinSummary }) => {
  console.log(checkinSummary);
  const median = checkinSummary.medianMood || 'N/A';
  return (
    <Container>
      <div>{`Number of checkins: ${checkinSummary.checkins.length}`}</div>
      <div>{`Median mood: ${median}`}</div>
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
