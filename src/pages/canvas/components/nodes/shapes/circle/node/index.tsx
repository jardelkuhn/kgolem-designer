import { NodeProps } from "@xyflow/react";

import { FamilyIcon } from "../../styling/default.icons";
import {
  BottomWrapper,
  Container,
  DefaultTopContentContainer,
  DefaultTopContentLabel,
  MiddleWrapper,
  ProviderCircle,
  RoundedMiddleContainer,
  TopWrapper,
} from "../styles";
import { AppNode } from "../../../types";
import NodeParamsFactory from "../../../_utilities/factories/node-params.factory";
import NodeColorsFactory from "../../../_utilities/factories/node-colors.factory";
import HandleFactory from "../../../../handles/_utilities/factories/handle.factory";

const withCircleShape = <T extends NodeProps<AppNode>>(
  WrappedComponent: React.ComponentType<T>
) => {
  return (props: T) => {
    const params = NodeParamsFactory.create(props.type);
    const color = new NodeColorsFactory(props.type).get(props.selected);

    const handles = HandleFactory.createHandles(props.id, props.type);

    return (
      <Container color={color}>
        <TopWrapper>
          <DefaultTopContentContainer>
            <FamilyIcon className={params.familyIcon} />
            <DefaultTopContentLabel>{params.title}</DefaultTopContentLabel>
          </DefaultTopContentContainer>
        </TopWrapper>

        <MiddleWrapper color={color}>
          <RoundedMiddleContainer>
            <WrappedComponent {...props} />
          </RoundedMiddleContainer>
        </MiddleWrapper>

        <BottomWrapper></BottomWrapper>

        {handles}

        <ProviderCircle>
          <FamilyIcon className={params.provider.icon} />
        </ProviderCircle>
      </Container>
    );
  };
};

export default withCircleShape;
