import React, { useState } from 'react';
import './App.css';
import {
  ScheduleComponent,
  Inject,
  Agenda,
  Day,
  Month,
  Week,
  WorkWeek,
  EventSettingsModel
} from '@syncfusion/ej2-react-schedule';
import { L10n } from '@syncfusion/ej2-base';

// Localization for the event window to include time pickers
L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Save',
      'cancelButton': 'Cancel',
      'deleteButton': 'Delete',
      'newEvent': 'Add Event',
      'editEvent': 'Edit Event',
      'subject': 'Subject',
      'location': 'Location',
      'startTime': 'Start Time',
      'endTime': 'End Time',
      'allDay': 'All Day',
    }
  }
});

const App = () => {
  const [events, setEvents] = useState<any>([
    {
      Id: 1,
      Subject: 'Team Meeting',
      Location: 'Office',
      StartTime: new Date(2024, 7, 10, 9, 0), // August 10, 2024, 9:00 AM
      EndTime: new Date(2024, 7, 10, 10, 0),  // August 10, 2024, 10:00 AM
      IsAllDay: false
    },
    {
      Id: 2,
      Subject: 'Client Presentation',
      Location: 'Client Site',
      StartTime: new Date(2024, 7, 15, 14, 0), // August 15, 2024, 2:00 PM
      EndTime: new Date(2024, 7, 15, 15, 30),  // August 15, 2024, 3:30 PM
      IsAllDay: false
    },
    {
      Id: 3,
      Subject: 'Project Deadline',
      Location: 'Remote',
      StartTime: new Date(2024, 7, 20, 23, 59), // August 20, 2024, 11:59 PM
      EndTime: new Date(2024, 7, 21, 0, 0),  // August 21, 2024, 12:00 AM
      IsAllDay: true
    },
    {
      Id: 4,
      Subject: 'Team Outing',
      Location: 'Resort',
      StartTime: new Date(2024, 7, 25, 9, 0), // August 25, 2024, 9:00 AM
      EndTime: new Date(2024, 7, 25, 18, 0),  // August 25, 2024, 6:00 PM
      IsAllDay: true
    }
  ]);

  const handleActionComplete = (args:any) => {
    if (args.requestType === 'eventCreate') {
      setEvents([...events, ...args.data]);
    } else if (args.requestType === 'eventChange') {
      setEvents(events.map((event:any):any => event.Id === args.data.Id ? args.data : event));
    } else if (args.requestType === 'eventRemove') {
      setEvents(events.filter((event:any):any => event.Id !== args.data[0].Id));
    }
  };

  return (
      <ScheduleComponent
          currentView='Month'
          selectedDate={new Date()} // August 1, 2024
          eventSettings={{ dataSource: events }}
          actionComplete={handleActionComplete}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
  );
};

export default App;
