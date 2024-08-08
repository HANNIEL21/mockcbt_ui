import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiUrl } from "../utils/constants";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${baseApiUrl}/user.php`);
      return response.data;
    },
  });
}
