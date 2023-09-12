import useData, { Name } from "./useData";

interface Language {
  language: Name;
  name: string;
}

export interface Generation {
  id: number;
  names: Language[];
  main_region: Name;
  version_groups: Name[];
}

const useGeneration = () => useData<Generation>("/generation");

export default useGeneration;
