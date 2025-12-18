import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../backend/pocketbase";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);  // <— refresh events list
    }
  });
}