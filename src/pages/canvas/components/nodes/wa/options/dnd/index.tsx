import { DnDProps } from "../../../@interfaces";
import withCircleDnd from "../../../shapes/circle/dnd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WAOptions(_props: DnDProps) {
  return <></>;
}

export const WAOptionsDnD = withCircleDnd(WAOptions);
