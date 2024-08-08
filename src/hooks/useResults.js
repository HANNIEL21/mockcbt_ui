import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiUrl } from "../utils/constants";

export function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const response = await axios.get(`${baseApiUrl}/result.php`);
      return response.data;
    },
  });
}
