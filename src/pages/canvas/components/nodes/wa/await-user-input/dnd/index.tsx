import { DnDProps } from "../../../@interfaces";
import withCircleDnd from "../../../shapes/circle/dnd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WAAwaitUserInput(_props: DnDProps) {
  return <></>;
}

export const WAAwaitUserInputDnd = withCircleDnd(WAAwaitUserInput);
