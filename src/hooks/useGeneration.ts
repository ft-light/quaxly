import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import axios, { AxiosError, CanceledError } from "axios";

interface Language {
  language: Name;
  name: string;
}

export interface Name {
  name: string;
}

interface Generation {
  id: number;
  names: Language[];
  main_region: Name;
  version_groups: Name[];
}

interface FetchResults {
  url: string;
}

interface FetchGenerationResponse {
  count: number;
  results: FetchResults[];
}

const useGeneration = () => {
  const [generation, setGeneration] = useState<Generation[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const temp: Generation[] = [];
    const controller = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const { data } = await apiClient.get<FetchGenerationResponse>(
          "/generation",
          {
            signal: controller.signal,
          }
        );
        await data.results.reduce(async (a, res) => {
          await a;
          const gen = await axios.get<Generation>(res.url, {
            signal: controller.signal,
          });
          temp.push(gen.data);
        }, Promise.resolve());

        setGeneration(temp);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { generation, error, isLoading };
};

export default useGeneration;
