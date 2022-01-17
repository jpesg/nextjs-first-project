import { getEventById, getAllEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummery from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getFeaturedEvents } from "../../dummy-data";
import Head from "next/head";
export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
  //load only featured events, for some events page is not pregenerated
  const events = await getFeaturedEvents();

  const paths = events.map((e) => ({ params: { eventId: e.id } }));
  return {
    paths,
    fallback: true, //true -> get events on the fly/ blocking -> wait for event feching
    revalidate: 30, //regenerate every 30seconds
  };
}
