import EventItem from "./event-item";
import classes from "./event-list.module.css";
function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem {...item} key={item.id} />
      ))}
    </ul>
  );
}

export default EventList;
