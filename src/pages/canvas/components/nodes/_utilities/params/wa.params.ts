import { CustomNodeType, NodeParams, ProviderParams } from "../../@interfaces";

export const waParams: ProviderParams = {
  title: "WhatsApp",
  icon: "bi bi-whatsapp",
};

export const waPlainTextParams: NodeParams = {
  title: "Send text",
  familyIcon: "bi bi-body-text",
  provider: waParams,
  type: CustomNodeType.WAPlainText,
};

export const waStartParams: NodeParams = {
  title: "Start",
  familyIcon: "bi bi-lightning-fill",
  provider: waParams,
  type: CustomNodeType.WAStart,
};

export const waOptionsParams: NodeParams = {
  title: "Send options",
  familyIcon: "bi bi-list-task",
  provider: waParams,
  type: CustomNodeType.WAOptions,
};

export const waAwaitTextParams: NodeParams = {
  title: "Await text",
  familyIcon: "bi bi-chat-right-dots",
  provider: waParams,
  type: CustomNodeType.WAAwaitText,
};

export const waImageParams: NodeParams = {
  title: "Send image",
  familyIcon: "bi bi-image",
  provider: waParams,
  type: CustomNodeType.WAImage,
};

export const waVideoParams: NodeParams = {
  title: "Send video",
  familyIcon: "bi bi-file-play",
  provider: waParams,
  type: CustomNodeType.WAVideo,
};

export const waDocumentParams: NodeParams = {
  title: "Send document",
  familyIcon: "bi bi-file-text",
  provider: waParams,
  type: CustomNodeType.WADocument,
};

export const waTemplateParams: NodeParams = {
  title: "Send template",
  familyIcon: "bi bi-journal",
  provider: waParams,
  type: CustomNodeType.WATemplate,
};
