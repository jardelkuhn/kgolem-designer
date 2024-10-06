import { ChangeEvent, memo } from "react";

import { RectangleOptionInput } from "../rectangle/styles";
import { DEFAULT_TEXT_PLACEHOLDER } from "../default.params";

interface Props {
  readonly value: string;
  readonly onBlur: () => void;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const MemoizedRectangleOptionInput = memo(
  ({ value, onChange, onBlur }: Props) => (
    <RectangleOptionInput
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      spellCheck={false}
      placeholder={DEFAULT_TEXT_PLACEHOLDER}
    />
  )
);
