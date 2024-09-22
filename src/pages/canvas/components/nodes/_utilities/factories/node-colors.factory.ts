import { ColorProps, NodeColor } from "../../@interfaces";
import defaultColors from "../colors/default.colors";
import waColors from "../colors/wa.colors";
import { isWAType } from "../guards/wa/wa.guard";

class NodeColorsFactory {
  colors: NodeColor;

  constructor(type?: string) {
    this.colors = this.create(type);
  }

  get(selected?: boolean): ColorProps {
    return this.colors.get(selected);
  }

  private create(type?: string): NodeColor {
    if (isWAType(type)) {
      return waColors;
    }

    return defaultColors;
  }
}

export default NodeColorsFactory;
