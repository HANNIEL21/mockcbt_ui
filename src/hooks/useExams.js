import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiUrl } from "../utils/constants";

export function useExams() {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const response = await axios.get(`${baseApiUrl}/exam.php`);
      return response.data;
    },
  });
}
