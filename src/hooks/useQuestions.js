import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiUrl } from "../utils/constants";

export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await axios.get(`${baseApiUrl}/question.php`);
      return response.data;
    },
  });
}
