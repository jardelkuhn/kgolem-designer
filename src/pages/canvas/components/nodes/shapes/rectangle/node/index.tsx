import { ChangeEvent, useCallback, useState } from "react";
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
import HandleFactory from "../../../../handles/_utilities/factories/handle.factory";
import { AppNode } from "../../../types";
import { useDesigner } from "../../../../../../../context/designer";
import { MemoizedRectangleTextArea } from "../../components/rectangle-text-area.component";

const withRectangleShape = <T extends NodeProps<AppNode>>(
  WrappedComponent?: React.ComponentType<T>
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
