import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import axios, { AxiosError, CanceledError } from "axios";

export interface Name {
  name: string;
}

interface FetchResults {
  url: string;
}

interface FetchResponse {
  count: number;
  results: FetchResults[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const temp: T[] = [];
    const controller = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const { data } = await apiClient.get<FetchResponse>(endpoint, {
          signal: controller.signal,
        });
        await data.results.reduce(async (a, res) => {
          await a;
          const r = await axios.get<T>(res.url, {
            signal: controller.signal,
          });
          temp.push(r.data);
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

export default useData;
