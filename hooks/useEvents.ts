import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents, selectEventsIsLoading } from "store/selectors/user";
import { getUserEvents } from "store/thunks/user";

export const useEvents = () => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();
  const loading = useSelector(selectEventsIsLoading);

  useEffect(() => {
    dispatch(getUserEvents());
  }, []);

  const formatDate = (date?: string) => {
    if (!date) return null;
    const newDate = new Date(date);
    return newDate.toLocaleDateString("sv-SE");
  };

  const formattedEvents = events.map((event) => ({
    ...event,
    created_at: formatDate(event.created_at),
  }));

  return { events: formattedEvents, loading };
};
