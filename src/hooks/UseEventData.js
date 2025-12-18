import { useQuery } from "@tanstack/react-query";
import { event_info, events_list, getSingleEvent } from "../backend/pocketbase";

export function useListEvent() {
    return useQuery({
        queryFn: () => events_list(),
        queryKey: ["eventlist"],
        networkMode: "always"
    });
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
  