import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleTicket, ticket_info, updateTicketSales } from "../BE/pocketbase";

export function useListEvent() {
    
}

export function useTicket() {
    return useQuery({
        queryFn: () => ticket_info(),
        queryKey: ["tickets"],
        networkMode: "always"
    });
}

export function useSingleTicket(id) {
    return useQuery({
      queryKey: ["ticket", id],
      queryFn: () => getSingleTicket(id),
      enabled: !!id,
      networkMode: "always" 
    });
  }
  

  export function useUpdateTicketSales() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, amount }) =>
      updateTicketSales(ticketId, amount),

    onSuccess: () => {
      queryClient.invalidateQueries(["tickets"]); // refresh UI
      queryClient.invalidateQueries(["events"]); // refresh event chart
    },
  });
}