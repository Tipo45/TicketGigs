import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { useEvent } from "../hooks/UseEventData";

const DetailedEvent = () => {
  const navigate = useNavigate();
  const { data: eventData, isLoading } = useEvent();

  return (
    <div>
      {isLoading ? (
        <p>Loading event details...</p>
      ) : (<div>hey yo
      <Button
        variant="outline"
        size="sm"
        className="border-purple-300 text-purple-700 hover:bg-purple-50 cursor-pointer"
        onClick={() => {
          navigate(`/edit-event/${eventData?.id}`, {
            state: {
              eventInfo: eventData,
            },
          });
        }}
      >
        <Eye className="h-4 w-4 mr-2" />
        Edit
      </Button></div>)}
    </div>
  );
};

export default DetailedEvent;
