import { sleep } from "../utils";
import { discussions } from "./mockData";
import { useQuery } from "@tanstack/react-query";
import { Disscusion } from "./constants";

const getComments = async () => {
  await sleep(1000);
  return discussions;
};

export const useDisscusionQuery = () => {
  return useQuery({
    queryFn: getComments,
    queryKey: [Disscusion],
    staleTime: Infinity,
    refetchOnMount: false,
    cacheTime: 60 * 1000 * 5, 
  });
};
