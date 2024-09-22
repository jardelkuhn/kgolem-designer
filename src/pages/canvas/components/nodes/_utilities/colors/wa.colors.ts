import { NodeColor, NodeColors } from "../../@interfaces";
import { defaultNodeColors } from "./default.colors";

const colors: NodeColors = {
  normal: {
    border: `linear-gradient(45deg, #a1e8af, #075e54)`,
    background: `linear-gradient(135deg, #FFFFFF, #C0C0C0) padding-box, linear-gradient(45deg, #A1E8AF, #075E54) border-box;`,
  },
  selected: defaultNodeColors.selected,
};

export const waColors: NodeColor = new NodeColor(colors);

export default waColors;
