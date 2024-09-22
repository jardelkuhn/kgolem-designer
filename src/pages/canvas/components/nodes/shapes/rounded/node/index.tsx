import { getShapeColors } from "../../../../../../../utilities/shape.utilities";
import { FamilyIcon } from "../../styling/default.icons";
import { ShapeProps } from "../../@types/shape.props";
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
          <FamilyIcon className={props.properties.familyIcon} />
          <DefaultTopContentLabel>
            {props.properties.title}
          </DefaultTopContentLabel>
        </DefaultTopContentContainer>
      </TopWrapper>

      <MiddleWrapper border={border}>
        <RoundedMiddleContainer>
          <RoundedMiddleLabel>{props.properties.title}</RoundedMiddleLabel>
        </RoundedMiddleContainer>
      </MiddleWrapper>

      <BottomWrapper></BottomWrapper>

      {props.children?.handles}

      <ProviderCircle>
        <FamilyIcon className={props.properties.providerIcon} />
      </ProviderCircle>
    </Container>
  );
}
