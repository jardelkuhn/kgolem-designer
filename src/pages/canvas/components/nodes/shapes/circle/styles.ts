import styled from "styled-components";

import { getDescriptionFonts, getTitleFonts } from "../../_utilities/colors";
import { ColorProps } from "../../@interfaces";

interface Props {
  color: ColorProps;
}

export const Container = styled.div<Props>`
  position: relative;
  width: 75px;
  height: 75px;
  border: 2px solid transparent;
  background: ${(props) => props.color.background};
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
  height: 26%;
  border-top-left-radius: 75px;
  border-top-right-radius: 75px;
`;

export const MiddleWrapper = styled.div<Props>`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 60.66%;
  position: relative;

  border-top: 2px solid transparent;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px; /* Height of the top border */
    background: ${(props) => props.color.border};
    border-radius: 3px 3px 0 0; /* Match the corners */
    z-index: 1; /* Ensure it appears above the background */
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 85%;
  height: 33.33%;
  border-bottom-left-radius: 75px;
  border-bottom-right-radius: 75px;
`;

export const DefaultTopContentContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2px;
  padding-top: 2px;
`;

export const DefaultTopContentLabel = styled.span`
  ${getTitleFonts()};
`;

export const RoundedMiddleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

export const RoundedMiddleLabel = styled.span`
  ${getDescriptionFonts()};
`;

export const ProviderCircle = styled.div`
  z-index: 2;
  position: absolute;
  top: -5px;
  left: -0px;
  width: 20px; /* Adjust the size as needed */
  height: 20px; /* Adjust the size as needed */
  background: white;
  border-radius: 50%; /* Makes it a circle */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */

  display: flex;
  justify-content: center;
  align-items: center;
`;
