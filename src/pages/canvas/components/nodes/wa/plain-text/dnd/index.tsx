import { DnDProps } from "../../../@interfaces";
import withRectangleDnd from "../../../shapes/rectangle/dnd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WAPlainText(_props: DnDProps) {
  return <></>;
}

export const WAPlainTextDnD = withRectangleDnd(WAPlainText);
