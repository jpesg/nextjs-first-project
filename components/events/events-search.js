import Button from "../ui/button";
import classes from "./events.search.module.css";
import { useRef } from "react";
const months = [
  {
    name: "January",
    id: "1",
  },
  {
    name: "Februay",
    id: "2",
  },
  {
    name: "March",
    id: "3",
  },
  {
    name: "April",
    id: "4",
  },
  {
    name: "May",
    id: "5",
  },
  {
    name: "June",
    id: "6",
  },
  {
    name: "July",
    id: "7",
  },
  {
    name: "Agaust",
    id: "8",
  },
  {
    name: "September",
    id: "9",
  },
  {
    name: "October",
    id: "10",
  },
  {
    name: "November",
    id: "11",
  },
  {
    name: "December",
    id: "12",
  },
];

function EventsSerach(props) {
  const yearRef = useRef();
  const monthRef = useRef();
  function submitHandler(e) {
    e.preventDefault();
    const year = yearRef.current.value;
    const month = monthRef.current.value;
    props.onSearch(year, month);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthRef}>
            {months.map((m) => (
              <option value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <Button>Submit</Button>
      </div>
    </form>
  );
}

export default EventsSerach;
