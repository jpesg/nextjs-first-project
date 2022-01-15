import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSerach from "../../components/events/events-search";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

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
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;
