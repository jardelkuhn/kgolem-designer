import { ShapeProps } from "../pages/canvas/components/nodes/shapes/shape.props";
import { selectionStyle } from "../pages/canvas/components/nodes/shapes/default.theming";

export function getShapeColors(props: ShapeProps): {
  border: string;
  background: string;
} {
  const border = props.options.selected
    ? selectionStyle.border
    : props.shape.border;
  const background = props.options.selected
    ? selectionStyle.background
    : props.shape.background;

  return { border, background };
}
