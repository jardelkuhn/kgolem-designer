import { ChangeEvent, memo } from "react";

import { RectangleTextArea } from "../rectangle/styles";
import { DEFAULT_TEXT_PLACEHOLDER } from "../default.params";

interface Props {
  readonly value: string;
  readonly onBlur: () => void;
  readonly onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const MemoizedRectangleTextArea = memo(
  ({ value, onChange, onBlur }: Props) => (
    <RectangleTextArea
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      spellCheck={false}
      placeholder={DEFAULT_TEXT_PLACEHOLDER}
    />
  )
);
