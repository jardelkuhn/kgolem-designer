import styled from "styled-components";

type ContainerProps = {
  borderColor: string;
  backgroundColor: string;
};

type MainProps = {
  borderColor: string;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100px;
  height: 75px;
  border: 2px solid ${(props) => props.borderColor};
  background: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
`;

export const TopWrapper = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  justify-content: center;
`;

export const IconWrapper = styled.div<MainProps>`
  width: 20%;

  display: flex;
  justify-content: center;
  border-right: 2px solid ${(props) => props.borderColor};
`;

export const LabelWrapper = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
`;

export const MainWrapper = styled.div<MainProps>`
  width: 100%;
  height: 70%;

  display: flex;
  justify-content: center;
  border-top: 2px solid ${(props) => props.borderColor};
`;
