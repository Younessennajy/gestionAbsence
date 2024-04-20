import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';


function Calendar() {
  const today = new Date();

  const getDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map(day => <th key={day} className="text-center">{day}</th>);
  };

  const createEmptyCells = (count) => {
    return Array.from({ length: count }, (_, index) => <td key={`empty-${index}`}></td>);
  };

  const getDaysOfMonth = () => {
    const firstDayOfMonth = startOfWeek(startOfMonth(today));
    const lastDayOfMonth = endOfWeek(endOfMonth(today));
    const daysOfMonth = [];

    let currentDate = firstDayOfMonth;
    while (currentDate <= lastDayOfMonth) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        week.push(
          <td key={currentDate.getTime()} className="text-center">
            {format(currentDate, 'd')}
          </td>
        );
        currentDate = addDays(currentDate, 1);
      }
      daysOfMonth.push(<tr key={`week-${currentDate.getTime()}`}>{week}</tr>);
    }

    return daysOfMonth;
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Calendar #07</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="elegant-calendar d-md-flex">
              <div className="wrap-header d-flex align-items-center img" style={{backgroundImage: "url(images/bg.jpg)"}}>
                <p id="reset">Today</p>
                <div id="header" className="p-0">
                  <div className="head-info">
                    <div className="head-month h4">{format(today, 'MMMM yyyy')}</div>
                    <div className="head-day h5">{format(today, 'EEEE')}</div>
                  </div>
                </div>
              </div>
              <div className="calendar-wrap">
                <div className="w-100 button-wrap">
                  <div className="pre-button d-flex align-items-center justify-content-center"><i className="fa fa-chevron-left"></i></div>
                  <div className="next-button d-flex align-items-center justify-content-center"><i className="fa fa-chevron-right"></i></div>
                </div>
                <table id="calendar" className="table table-bordered">
                  <thead>
                    <tr>{getDaysOfWeek()}</tr>
                  </thead>
                  <tbody>
                    {createEmptyCells(1)} 
                    {getDaysOfMonth()}
                    {createEmptyCells(2)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
