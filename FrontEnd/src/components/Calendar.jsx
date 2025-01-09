// eslint-disable-next-line no-unused-vars
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";

const CalendarComponent = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "Event 1", start: "2025-01-01" },
        { title: "Event 2", start: "2025-01-05", end: "2025-01-07" },
        { title: "Event 3", start: "2025-01-09T12:30:00", allDay: false },
      ]}
    />
  );
};

export default CalendarComponent;
