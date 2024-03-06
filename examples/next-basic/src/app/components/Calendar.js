import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


// Component to display event details
const EventDetails = ({ school, event, onEventClick }) => (
  <div className="flex rounded-lg bg-gray-100 shadow-md p-4 event-details" onClick={() => onEventClick(event)}>
    {school && school.logo && (
      <img src={school.logo} alt="School Logo" className="w-1/4 rounded-l-md" />
    )}
    <div className="flex-grow px-4 py-2">
      <h3 className="text-lg font-bold mb-2">{new Date(event.date).toLocaleString()}</h3>
      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
      {event.school && event.school.name && (
        <p className="font-bold">{event.school.name}</p>
      )}
    </div>
  </div>
);



// Component to display events on the calendar
const CalendarEventIndicator = ({ count }) => (
  <div className="calendar-event-indicator">{count > 0 && `+${count}`}</div>
);

const MyCalendar = ({ school, events }) => {
  const [value, onChange] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [showDayEvents, setShowDayEvents] = useState(false);

  useEffect(() => {
    // Filter events based on the selected date
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === value.getDate() &&
        eventDate.getMonth() === value.getMonth() &&
        eventDate.getFullYear() === value.getFullYear()
      );
    });

    // Update displayed events based on whether to show all events or day events
    setDisplayedEvents(showDayEvents ? filteredEvents : events);
  }, [value, events, showDayEvents]);

  const handleDateChange = (newValue) => {
    onChange(newValue);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="Sample__container">
      <main className="Sample__container__content">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={value}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const dayEvents = events.filter(
                  (event) => {
                    const eventDate = new Date(event.date);
                    return (
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear()
                    );
                  }
                );
                return <CalendarEventIndicator count={dayEvents.length} />;
              }
              return null;
            }}
          />
        </div>

        <div className="event-list">
          <h2>Events for {value.toDateString()}:</h2>
          <div className="tabs">
            <button onClick={() => setShowDayEvents(false)}>All Events</button>
            <button onClick={() => setShowDayEvents(true)}>Day Events</button>
          </div>
          {displayedEvents.length > 0 ? (
            <ul className="space-y-4"> {/* Added space-y-4 class for vertical spacing */}
              {displayedEvents.map((event) => (
                <li key={event._id}>
                  <EventDetails school={school} event={event} onEventClick={handleEventClick} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for the selected day.</p>
          )}
        </div>
        {selectedEvent && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-md">
             <div className="flex rounded-lg bg-gray-100 shadow-md p-4 event-details">
               <span className="close text-3xl cursor-pointer" onClick={closeEventModal}>
                  &times;
                </span>
                <h2 className="text-2xl font-semibold mb-4">{selectedEvent.title}</h2>
                <p>{selectedEvent.description}</p>
                {school && school.logo && (
                  <img src={school.logo} alt="School Logo" className="w-1/8 rounded-l-md" style={{ maxWidth: '200px', maxHeight: '100px' }} />
                )}
                <span>{selectedEvent.information}</span>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default MyCalendar;
