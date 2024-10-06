import { ChangeEvent, useCallback, useState } from "react";
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
import { useDesigner } from "../../../../../../../context/designer";
import { MemoizedRectangleTextArea } from "../../components";

const withCircleShape = <T extends NodeProps<AppNode>>(
  WrappedComponent: React.ComponentType<T>
) => {
  return (props: T) => {
    const { handleNodeText } = useDesigner();

    const [text, setText] = useState(props.data.text);

    const params = NodeParamsFactory.get(props.type);
    const color = new NodeColorsFactory(props.type).get(props.selected);

    const handles = HandleFactory.createHandles(props.id, props.type);

    const onTextChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value ?? "");
      },
      []
    );

    const onTextBlur = useCallback(() => {
      handleNodeText(props.id, text);
    }, [handleNodeText, text, props.id]);

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
            {params.textContent && (
              <MemoizedRectangleTextArea
                value={text}
                onBlur={onTextBlur}
                onChange={onTextChange}
              />
            )}
            {params.customContent && WrappedComponent && (
              <WrappedComponent {...props} />
            )}
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
