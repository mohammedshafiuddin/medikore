import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/services/axios";
import { Doctor } from "shared-types";

/**
 * Hook to fetch doctors based on user's responsibilities:
 * - If the user is a hospital admin, returns all doctors in that hospital
 * - If the user is a secretary, returns all doctors they are secretary for
 * - Otherwise returns an empty array
 */
export function useGetMyDoctors({enabled}: {enabled: boolean}) {
  return useQuery<Doctor[]>({
    queryKey: ['my-doctors'],
    queryFn: async () => {
      const response = await axios.get('/doctors/my-doctors');
      return response.data;
    },
    enabled
  });   
}
