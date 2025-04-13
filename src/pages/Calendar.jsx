import React, { useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

// import { scheduleData } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  const calendarData = JSON.parse(localStorage.getItem('calendarData'));


  const handleSchedulerActions = async (args) => {
    const baseURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/calendar`;

    try {
      if (args.requestType === 'eventCreated') {
        console.log('eventCreated', args.data);
        await axios.post(baseURL, args.data);
      } else if (args.requestType === 'eventChanged') {
        await axios.put(`${baseURL}/${args.data.Id}`, args.data);
        console.log('eventChanged', args.data);
      } else if (args.requestType === 'eventRemoved') {
        await axios.delete(`${baseURL}/${args.data[0].Id}`);
        console.log('eventRemoved', args.data[0].Id);
      }
    } catch (error) {
      console.error('Scheduler action error:', error);
    }
  };

  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Maintainance" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: calendarData }}
        dragStart={onDragStart}
        actionComplete={(args) => handleSchedulerActions(args)}
      >
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
