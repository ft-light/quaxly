import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import axios, { AxiosError, CanceledError } from "axios";

interface Name {
  name: string;
}

interface Language extends Name {
  language: Name;
}

export interface FetchResults extends Name {
  url: string;
}

interface FetchResponse {
  count: number;
  results: FetchResults[];
}

interface Generation {
  id: number;
  names: Language[];
  main_region: Name;
  version_groups: FetchResults[];
}

const useGeneration = () => {
  const [data, setData] = useState<Generation[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const temp: Generation[] = [];
    const controller = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const { data } = await apiClient.get<FetchResponse>("/generation", {
          signal: controller.signal,
        });
        await data.results.reduce(async (a, res) => {
          await a;
          const { data: g } = await axios.get<Generation>(res.url, {
            signal: controller.signal,
          });
          temp.push(g);
        }, Promise.resolve());

        setData(temp);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useGeneration;
