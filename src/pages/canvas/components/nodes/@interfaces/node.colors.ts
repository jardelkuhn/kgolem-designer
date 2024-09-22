export interface NodeColors {
  normal: ColorProps;
  selected: ColorProps;
}

export interface ColorProps {
  border: string;
  background: string;
}

export class NodeColor {
  color: NodeColors;

  constructor(color: NodeColors) {
    this.color = color;
  }

  get = (selected?: boolean): ColorProps => {
    return selected ? this.color.selected : this.color.normal;
  };
}
