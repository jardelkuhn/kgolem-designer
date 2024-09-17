import {
  RectangleMainContainer,
  RectangleMainSpan,
} from "../../../../shapes/rectangle/content/main-label/styles";

const mainLabel = (label: string) => (
  <RectangleMainContainer>
    <RectangleMainSpan>{label}</RectangleMainSpan>
  </RectangleMainContainer>
);

export default mainLabel;
