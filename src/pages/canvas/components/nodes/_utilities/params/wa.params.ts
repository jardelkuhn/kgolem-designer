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
