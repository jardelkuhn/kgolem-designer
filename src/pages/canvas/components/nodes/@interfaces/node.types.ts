export enum CustomNodeType {
  WAStart = "WAStart",
  WAConclude = "WAConclude",
  WAOptions = "WAOptions",
  WAPlainText = "WAPlainText",
  WAAwaitText = "WAAwaitText",
  WAImage = "WAImage",
  WAVideo = "WAVideo",
  WADocument = "WADocument",
  WATemplate = "WATemplate",
  Default = "default",
}

export const WA_NODE_TYPES = [
  CustomNodeType.WAStart,
  CustomNodeType.WAConclude,
  CustomNodeType.WAOptions,
  CustomNodeType.WAPlainText,
  CustomNodeType.WAAwaitText,
  CustomNodeType.WAImage,
  CustomNodeType.WAVideo,
  CustomNodeType.WADocument,
  CustomNodeType.WATemplate,
];
