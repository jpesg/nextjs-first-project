import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";
import {
  filterEventsByDate,
  getFilteredEvents,
  mapEvents,
  url,
} from "../../helpers/api-utils";
import useSWR from "swr";
function FilteredEventsPage(props) {
  const router = useRouter();
  const filteredData = router.query.slug;
  const [year, month] = filteredData;
  //to number
  const numYear = +year;
  const numMonth = +month;
  const { data, error } = useSWR(url);

  //check month less than 1 or greater than 12
  if (
    error ||
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!data) {
    return <p className="center">Loading...</p>;
  }
  const events = mapEvents(data);
  const filteredEvents = filterEventsByDate(events, {
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <Head>
          <title>Filtered Events</title>
          <meta
            name="description"
            content={`All events for ${numMonth}/${numYear}`}
          />
        </Head>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
