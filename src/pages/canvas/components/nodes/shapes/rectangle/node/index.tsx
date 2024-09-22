import { NodeProps } from "@xyflow/react";

import { FamilyIcon } from "../../styling/default.icons";
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
import NodeColorsFactory from "../../../_utilities/factories/node-colors.factory";
import NodeParamsFactory from "../../../_utilities/factories/node-params.factory";
import { AppNode } from "../../../types";
import HandleFactory from "../../../../handles/_utilities/factories/handle.factory";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withRectangleShape = (WrappedComponent: any) => {
  return (props: NodeProps<AppNode>) => {
    const params = NodeParamsFactory.create(props.type);
    const color = new NodeColorsFactory(props.type).get(props.selected);

    const handles = HandleFactory.createHandles(props.id, props.type);

    return (
      <Container color={color}>
        <TopWrapper>
          <IconWrapper color={color}>
            <RectangleIconContainer>
              <FamilyIcon className={params.familyIcon} />
            </RectangleIconContainer>
          </IconWrapper>
          <LabelWrapper>
            <RectangleMainContainer>
              <RectangleMainSpan>{params.title}</RectangleMainSpan>
            </RectangleMainContainer>
          </LabelWrapper>
        </TopWrapper>

        <MainWrapper color={color}>
          <WrappedComponent {...props} />
        </MainWrapper>

        {handles}

        <ProviderCircle>
          <FamilyIcon className={params.provider.icon} />
        </ProviderCircle>
      </Container>
    );
  };
};

export default withRectangleShape;
