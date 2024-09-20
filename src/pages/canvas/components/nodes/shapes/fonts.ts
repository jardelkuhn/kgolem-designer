export const fonts = {
  color: "#212121",
  fontWeight: 400,
  fontFamily: "'Roboto', sans-serif",
};

export const iconFont = {
  color: "#333333",
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
