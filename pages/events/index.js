import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSerach from "../../components/events/events-search";
import { useRouter } from "next/router";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const handleSearch = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  return (
    <div>
      <EventsSerach onSearch={handleSearch} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventsPage;
