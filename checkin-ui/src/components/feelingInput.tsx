import {Feeling} from "../types";
import React from "react";
import styled from "styled-components";

const INPUT_CLASS = 'feelingInput';

const InputContainer = styled.input`
  margin: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
`;

const StyledInput = styled.div`
  margin: 16px;
  font-size: 18px;
`;

const AllInputs = styled.div`
  margin: 16px;
`;

const FeelingOption = ({feeling, handleChange}: { feeling: string, handleChange: (e: any) => void }) => {
  return (
    <StyledInput>
      <label>
        {feeling[0].toUpperCase() + feeling.slice(1)}
        <InputContainer className={INPUT_CLASS} type='checkbox' value={feeling} onChange={handleChange}/>
      </label>
    </StyledInput>

  )
};

export const FeelingInput = ({setFeelingFn}: { setFeelingFn: (feeling: string[]) => void }) => {
  const feelingsOptions = Object.values(Feeling);

  const handleFeelingChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    const inputs = window.document.querySelectorAll<HTMLInputElement>(`.${INPUT_CLASS}`);
    const feelings = Array.from(inputs).filter(input => input.checked).map(input => input.value);
    setFeelingFn(feelings)
  };
  return (
    <Container>
      <h4>
        Please select one or more of the following feelings which describe how you are feeling today
      </h4>
      <AllInputs>
        {feelingsOptions.map((feeling, index) => {
          return <FeelingOption key={`feeling-${index}`} feeling={feeling} handleChange={handleFeelingChange}/>
        })}
      </AllInputs>

    </Container>
  )
};
