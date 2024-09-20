import { FamilyIcon } from "../icons";
import { RectangleProps } from "./shape.props";
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
} from "./styles";

export function RectangleShape({ shape, options, children }: RectangleProps) {
  return (
    <Container background={shape.background}>
      <TopWrapper>
        <IconWrapper border={shape.border}>
          <RectangleIconContainer>
            <FamilyIcon className={options.familyIcon} />
          </RectangleIconContainer>
        </IconWrapper>
        <LabelWrapper>
          <RectangleMainContainer>
            <RectangleMainSpan>{options.title}</RectangleMainSpan>
          </RectangleMainContainer>
        </LabelWrapper>
      </TopWrapper>

      <MainWrapper border={shape.border}>{children?.content}</MainWrapper>

      {children?.handles}

      <ProviderCircle>
        <FamilyIcon className={options.providerIcon} />
      </ProviderCircle>
    </Container>
  );
}
