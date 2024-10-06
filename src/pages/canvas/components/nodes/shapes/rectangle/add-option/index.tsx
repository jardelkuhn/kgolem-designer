import { useState } from "react";

import { AddOptionContainer, AddOptionIcon } from "../styles";
import { ColorProps } from "../../../@interfaces";

interface Props {
  readonly color: ColorProps;

  readonly handleClick: () => Promise<void>;
}

export function AddRectangleOption(props: Props) {
  const { color, handleClick } = props;

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await handleClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddOptionContainer
      loading={loading ? "yes" : "no"}
      color={color}
      onClick={onClick}
    >
      <AddOptionIcon className="bi bi-plus-circle" />
    </AddOptionContainer>
  );
}
