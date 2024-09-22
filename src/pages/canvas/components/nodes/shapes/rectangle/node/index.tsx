import { getShapeColors } from "../../../../../../../utilities/shape.utilities";
import { FamilyIcon } from "../../styling/default.icons";
import { ShapeProps } from "../../@types/shape.props";
import {
  Container,
  IconWrapper,
  LabelWrapper,
  MainWrapper,
  ProviderCircle,
  RectangleIconContainer,
  RectangleMainContainer,
  RectangleMainSpan,
  TopWrapper,
} from "../styles";

export function RectangleShape(props: ShapeProps) {
  const { border, background } = getShapeColors(props);

  return (
    <Container background={background}>
      <TopWrapper>
        <IconWrapper border={border}>
          <RectangleIconContainer>
            <FamilyIcon className={props.properties.familyIcon} />
          </RectangleIconContainer>
        </IconWrapper>
        <LabelWrapper>
          <RectangleMainContainer>
            <RectangleMainSpan>{props.properties.title}</RectangleMainSpan>
          </RectangleMainContainer>
        </LabelWrapper>
      </TopWrapper>

      <MainWrapper border={border}>{props.children?.content}</MainWrapper>

      {props.children?.handles}

      <ProviderCircle>
        <FamilyIcon className={props.properties.providerIcon} />
      </ProviderCircle>
    </Container>
  );
}
