import { getShapeColors } from "../../../../../../../utilities/shape.utilities";
import { FamilyIcon } from "../../icons";
import { ShapeProps } from "../../shape.props";
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
            <FamilyIcon className={props.options.familyIcon} />
          </RectangleIconContainer>
        </IconWrapper>
        <LabelWrapper>
          <RectangleMainContainer>
            <RectangleMainSpan>{props.options.title}</RectangleMainSpan>
          </RectangleMainContainer>
        </LabelWrapper>
      </TopWrapper>

      <MainWrapper border={border}>{props.children?.content}</MainWrapper>

      {props.children?.handles}

      <ProviderCircle>
        <FamilyIcon className={props.options.providerIcon} />
      </ProviderCircle>
    </Container>
  );
}
