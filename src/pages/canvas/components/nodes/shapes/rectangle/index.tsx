import { RectangleProps } from "./shape.props";
import {
  Container,
  IconWrapper,
  LabelWrapper,
  MainWrapper,
  TopWrapper,
} from "./styles";

export function RectangleShape({ shape, children }: RectangleProps) {
  return (
    <Container
      borderColor={shape.borderColor}
      backgroundColor={shape.backgroundColor}
    >
      <TopWrapper>
        <IconWrapper borderColor={shape.borderColor}>
          {children?.icon}
        </IconWrapper>
        <LabelWrapper>{children?.topLabel}</LabelWrapper>
      </TopWrapper>

      <MainWrapper borderColor={shape.borderColor}>
        {children?.mainLabel}
      </MainWrapper>

      {children?.handles}
    </Container>
  );
}
