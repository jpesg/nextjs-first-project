import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
function HomePage(props) {
  //client side data fetching--> useEffect + fetch || SWR
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

//we want to display the featured events --> static props

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // regenerate page every xxx time
  };
}
export default HomePage;
