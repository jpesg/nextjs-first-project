export const url =
  "https://next-js-course-c81cc-default-rtfb.firebaseio.com/events.json";

export const mapEvents = (data) => {
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
};
export async function getAllEvents() {
  const response = await fetch(url);
  const data = await response.json();

  return mapEvents(data);
}
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();
  return filterEventsByDate(allEvents, dateFilter);
}

export const filterEventsByDate = (events, dateFilter) => {
  const { year, month } = dateFilter;
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
