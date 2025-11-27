import { useQuery } from "@tanstack/react-query";
import { hostInfo, pb } from "../backend/pocketbase";

export function useHostData() {
    const id = pb.authStore.record.id;
    return useQuery({
        queryFn: () => hostInfo(),
        queryKey: ["host_info", id],
        networkMode: "always"
    });
}