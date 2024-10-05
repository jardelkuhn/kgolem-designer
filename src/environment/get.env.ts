import { ServicesMethod } from "./@types";

export const getServicesMethod = () => {
  const value: ServicesMethod =
    (import.meta.env.VITE_REPOSITORY as ServicesMethod) || "LOCAL";

  return value;
};
