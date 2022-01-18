import Image from "next/image";
import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
const EventItem = ({ title, image, date, location, id }) => {
  const _date = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const _address = location.replace(", ", "\n");
  /*
<div className={classes.imageContainer}>
        <Image src={`/${image}`} alt={image} layout="fill" objectFit="cover" />
      </div>
*/
  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={image} width={250} height={160} />

      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{_date}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{_address}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
export default EventItem;
