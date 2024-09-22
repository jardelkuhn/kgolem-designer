import { NodeParams, ProviderParams } from "../../@interfaces";

export const waParams: ProviderParams = {
  title: "WhatsApp",
  icon: "bi bi-whatsapp",
};

export const waPlainTextParams: NodeParams = {
  title: "Enviar texto",
  familyIcon: "bi bi-body-text",
  provider: waParams,
};

export const waStartParams: NodeParams = {
  title: "Início",
  familyIcon: "bi bi-lightning-fill",
  provider: waParams,
};

export const waOptionsParams: NodeParams = {
  title: "Enviar opções",
  familyIcon: "bi bi-list-task",
  provider: waParams,
};
