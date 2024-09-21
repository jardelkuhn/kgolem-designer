import { getShapeColors } from "../../../../../../../utilities/shape.utilities";
import { FamilyIcon } from "../../icons";
import { ShapeProps } from "../../shape.props";
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
} from "../styles";

export function RoundedShape(props: ShapeProps) {
  const { border, background } = getShapeColors(props);

  return (
    <Container background={background}>
      <TopWrapper>
        <DefaultTopContentContainer>
          <FamilyIcon className={props.options.familyIcon} />
          <DefaultTopContentLabel>{props.options.title}</DefaultTopContentLabel>
        </DefaultTopContentContainer>
      </TopWrapper>

      <MiddleWrapper border={border}>
        <RoundedMiddleContainer>
          <RoundedMiddleLabel>{props.options.title}</RoundedMiddleLabel>
        </RoundedMiddleContainer>
      </MiddleWrapper>

      <BottomWrapper></BottomWrapper>

      {props.children?.handles}

      <ProviderCircle>
        <FamilyIcon className={props.options.providerIcon} />
      </ProviderCircle>
    </Container>
  );
}
