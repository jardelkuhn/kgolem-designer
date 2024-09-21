export const fonts = {
  color: "#212121",
  fontWeight: 400,
  fontFamily: "'Roboto', sans-serif",
};

export const iconStyle = {
  color: "#333333",
};

export const selectionStyle = {
  border: `linear-gradient(45deg, orange, yellow)`,
  background: `linear-gradient(135deg, #FFFFFF, #C0C0C0) padding-box, linear-gradient(45deg, orange, yellow) border-box;`,
};

export const rectangleStyle = {
  // width: "100px",
};

export const textFont = {
  title: "7px",
  description: "7px",
};

export const getTitleFonts = () => {
  return `
    font-size: ${textFont.title};
    text-align: justify;
    color: ${fonts.color};
    font-weight: 700;
    font-family: ${fonts.fontFamily};
  `;
};

export const getDescriptionFonts = () => {
  return `
    font-size: ${textFont.description};
    color: ${fonts.color};
    font-weight: ${fonts.fontWeight};
    font-family: ${fonts.fontFamily};
  `;
};
