import styled from "styled-components";

type ContainerProps = {
  borderColor: string;
  backgroundColor: string;
};

type MiddleProps = {
  borderColor: string;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 75px;
  height: 75px;
  border: 2px solid ${(props) => props.borderColor};
  background: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 85%;
  height: 33.33%;
  border-top-left-radius: 75px;
  border-top-right-radius: 75px;
`;

export const MiddleWrapper = styled.div<MiddleProps>`
  display: flex;
  justify-content: center;

  width: 98%;
  height: 33.33%;

  border-top: 2px solid ${(props) => props.borderColor};
  // border-bottom: 2px solid ${(props) => props.borderColor};
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 85%;
  height: 33.33%;
  border-bottom-left-radius: 75px;
  border-bottom-right-radius: 75px;
`;
