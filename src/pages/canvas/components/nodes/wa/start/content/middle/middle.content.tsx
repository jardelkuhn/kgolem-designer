import {
  RoundedMiddleContainer,
  RoundedMiddleLabel,
} from "../../../../shapes/rounded/content/middle/styles";

const middleContent = (label: string) => (
  <RoundedMiddleContainer>
    <RoundedMiddleLabel>{label}</RoundedMiddleLabel>
  </RoundedMiddleContainer>
);

export default middleContent;
