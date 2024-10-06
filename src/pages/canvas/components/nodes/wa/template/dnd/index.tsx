import { DnDProps } from "../../../@interfaces";
import withRectangleDnd from "../../../shapes/rectangle/dnd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WATemplate(_props: DnDProps) {
  return <></>;
}

export const WATemplateDnD = withRectangleDnd(WATemplate);
