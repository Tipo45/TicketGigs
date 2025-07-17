import { useQuery } from "@tanstack/react-query";
import { event_info, getSingleEvent } from "../BE/pocketbase";

export function useListEvent() {
    
}

export function useEvent() {
    return useQuery({
        queryFn: () => event_info(),
        queryKey: ["events"],
        networkMode: "always"
    });
}

export function useSingleEvent(id) {
    return useQuery({
      queryKey: ["event", id],
      queryFn: () => getSingleEvent(id),
      enabled: !!id,
      networkMode: "always" 
    });
  }
  