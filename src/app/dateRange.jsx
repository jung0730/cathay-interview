'use client'
import { useState } from "react";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handleDayClick = (day) => {
    if (!startDate || day < startDate) {
      setStartDate(day);
      setEndDate(null);
    } else if (!endDate || day >= startDate) {
      setEndDate(day);
    }
  };

  const isInRange = (day) => {
    return startDate && endDate && day >= startDate && day <= endDate;
  };

  const isNonCurrentMonth = (day) => {
    return day.getMonth() !== currentMonth;
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
  
    const firstDisplayDay = new Date(firstDayOfMonth);
    firstDisplayDay.setDate(firstDisplayDay.getDate() - startingDay);
  
    const lastDayOfMonth = new Date(currentYear, currentMonth, totalDays);
    const endingDay = lastDayOfMonth.getDay();
    const lastDisplayDay = new Date(lastDayOfMonth);
    lastDisplayDay.setDate(lastDisplayDay.getDate() + (6 - endingDay));
  
    const MAX_DAYS = 42;
    for (let i = 0; i < MAX_DAYS; i++) {
      const day = new Date(firstDisplayDay);
      day.setDate(day.getDate() + i);
      if (day > lastDisplayDay) break;
  
      days.push(
        <div
          key={day.toDateString()}
          className={`${isNonCurrentMonth(day) ? 'cursor-not-allowed disabled bg-gray-light' : 'hover:bg-gray cursor-pointer'}
          ${isInRange(day)? 'bg-blue' : ''}
          ${day.getTime() === startDate?.getTime() ? 'bg-blue' : ''}
          ${day.getTime() === endDate?.getTime() ? 'bg-blue' : ''}
          ${currentDate.getDate() === i ? 'bg-yellow' : ''} 
          flex justify-center items-center w-[50px] h-[30px]`}
          onClick={() => {
            if (!isNonCurrentMonth(day)) {
              handleDayClick(day);
            }
          }}
        >
          {day.getDate()}
        </div>
      );
    }
  
    return days;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[350px] h-[240px]">
        <div className="w-[350px] h-[44px] mb-4 flex justify-between items-center">
          <button className="w-[44px] h-[44px] hover:bg-gray disabled cursor-not-allowed">
            {'<' }
          </button>
          <div data-testid="current-month">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
          <button className="w-[44px] h-[44px] hover:bg-gray disabled cursor-not-allowed">
            {'>'}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-5">
          {renderDays()}
        </div>
        <div>
      </div>
      <br/>
      <div data-testid="start-date">Start Date: {startDate ? startDate.toLocaleDateString() : 'N/A'}</div>
      <div data-testid="end-date">End Date: {endDate ? endDate.toLocaleDateString() : 'N/A'}</div>
      </div>
    </div>
  );
};

export default DateRangePicker;