import { getEventById, getAllEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummery from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <EventSummery title={event.title} />
      <EventLogistics
        {...{
          date: event.date,
          address: event.location,
          image: event.image,
          imageAlt: event.title,
        }}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
export async function getStaticProps(context) {
  const id = context.params.eventId;
  const event = await getEventById(id);
  return {
    props: {
      event,
    },
  };
}
//pregenerate all events page
export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((e) => ({ params: { eventId: e.id } }));
  return {
    paths,
    fallback: false, //true -> get events on the fly/ blocking -> wait for event feching
  };
}
