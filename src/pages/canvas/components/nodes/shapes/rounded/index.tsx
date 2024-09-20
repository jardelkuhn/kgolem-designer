import { FamilyIcon } from "../icons";
import { RoundedProps } from "./shape.props";
import {
  BottomWrapper,
  Container,
  DefaultTopContentContainer,
  DefaultTopContentLabel,
  MiddleWrapper,
  ProviderCircle,
  RoundedMiddleContainer,
  RoundedMiddleLabel,
  TopWrapper,
} from "./styles";

export function RoundedShape({ shape, options, children }: RoundedProps) {
  return (
    <Container background={shape.background}>
      <TopWrapper>
        <DefaultTopContentContainer>
          <FamilyIcon className={options.familyIcon} />
          <DefaultTopContentLabel>{options.title}</DefaultTopContentLabel>
        </DefaultTopContentContainer>
      </TopWrapper>

      <MiddleWrapper border={shape.border}>
        <RoundedMiddleContainer>
          <RoundedMiddleLabel>{options.title}</RoundedMiddleLabel>
        </RoundedMiddleContainer>
      </MiddleWrapper>

      <BottomWrapper></BottomWrapper>

      {children?.handles}

      <ProviderCircle>
        <FamilyIcon className={options.providerIcon} />
      </ProviderCircle>
    </Container>
  );
}
