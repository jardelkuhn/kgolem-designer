import styled from "styled-components";

export interface TooltipDivProps {
  tooltip: string;
}

export const TooltipDiv = styled.div<TooltipDivProps>`
  &[tooltip]::before {
    position: absolute;
    content: attr(tooltip);
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
    font-size: 5px;

    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }

  &[tooltip]:hover::before {
    opacity: 1;
  }
`;
