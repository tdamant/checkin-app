import {FaRegSadTear, FaRegSmile} from "react-icons/fa";
import InputSlider from "react-input-slider";
import React, {useState} from "react";
import styled from "styled-components";
import {GenericButton} from "./genericButton";
import {moodRange} from "../types";

const Mood = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px;
`;

const Input = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const MoodInput = ({setMoodFn}: {setMoodFn: (mood: number) => void}) => {
  const [rangeInput, setRangeInput] = useState<number>(4);

  const setMood = () => {
    setMoodFn(rangeInput)
  };

  return (
  <Mood>
    <h4> How are you doing today? </h4>
    <Input>
      <FaRegSadTear size='4em' style={{padding: 32}}/>
      <InputSlider axis='x' xmax={moodRange.max} xmin={moodRange.min} x={rangeInput} onChange={({x}) => setRangeInput(x)}/>
      <FaRegSmile size='4em' style={{padding: 32}}/>
    </Input>
    <GenericButton onClick={setMood} text='Set'/>
  </Mood>
  )
};
