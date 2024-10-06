import { DnDProps } from "../../../@interfaces";
import withRectangleDnd from "../../../shapes/rectangle/dnd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WAImage(_props: DnDProps) {
  return <></>;
}

export const WAImageDnD = withRectangleDnd(WAImage);
