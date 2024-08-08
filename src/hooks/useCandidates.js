import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiUrl } from "../utils/constants";

export function useCandidates() {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const response = await axios.get(`${baseApiUrl}/candidate.php`);
      return response.data;
    },
  });
}
