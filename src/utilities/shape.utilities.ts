import { ShapeProps } from "../pages/canvas/components/nodes/shapes/@types/shape.props";
import { selectionStyle } from "../pages/canvas/components/nodes/shapes/styling/default.theming";

export function getShapeColors(props: ShapeProps): {
  border: string;
  background: string;
} {
  const border = props.properties.selected
    ? selectionStyle.border
    : props.shape.border;
  const background = props.properties.selected
    ? selectionStyle.background
    : props.shape.background;

  return { border, background };
}
