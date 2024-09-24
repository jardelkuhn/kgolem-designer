import { DnDProps } from "../../../@interfaces";
import withCircleDnd from "../../../shapes/circle/dnd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WAPlainText(_props: DnDProps) {
  return <></>;
}

export const WAPlainTextDnD = withCircleDnd(WAPlainText);
