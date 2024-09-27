import { RepositoryMethod } from "./@types";

export const getRepositoryMethod = () => {
  const value: RepositoryMethod =
    (import.meta.env.VITE_REPOSITORY as RepositoryMethod) || "LOCAL";

  return value;
};
