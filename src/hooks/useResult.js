import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiUrl } from "../utils/constants";

export function useResult(id) {
  return useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(`${baseApiUrl}/result.php?id=${id}`);
      return response.data;
    },
  });
}
