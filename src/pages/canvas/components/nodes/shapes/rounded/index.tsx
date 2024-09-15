import { RoundedProps } from "./shape.props";
import { BottomWrapper, Container, MiddleWrapper, TopWrapper } from "./styles";

export function RoundedShape({ shape, children }: RoundedProps) {
  return (
    <Container
      borderColor={shape.borderColor}
      backgroundColor={shape.backgroundColor}
    >
      <TopWrapper>{children?.top}</TopWrapper>

      <MiddleWrapper borderColor={shape.borderColor}></MiddleWrapper>

      <BottomWrapper></BottomWrapper>

      <>{children?.handles}</>
    </Container>
  );
}
