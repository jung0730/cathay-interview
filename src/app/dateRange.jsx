'use client'
import { useState } from "react";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDayClick = (day) => {
    if (!startDate) {
      setStartDate(day);
      return;
    }
    if (day < startDate) {
      setStartDate(day);
      setEndDate(null);
      return;
    }
    if (!endDate || day >= startDate) {
      setEndDate(day);
      return;
    }
  };

  const isInRange = (day) => {
    return startDate && endDate && day >= startDate && day <= endDate;
  };

  const isNonCurrentMonth = (day) => {
    return day.getMonth() !== currentDate.getMonth();
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  
    const firstDisplayDay = new Date(firstDayOfMonth);
    firstDisplayDay.setDate(firstDisplayDay.getDate() - startingDay);
  
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), totalDays);
    const endingDay = lastDayOfMonth.getDay();
    const lastDisplayDay = new Date(lastDayOfMonth);
    lastDisplayDay.setDate(lastDisplayDay.getDate() + (6 - endingDay));
  
    for (let i = 0; i < 42; i++) {
      const day = new Date(firstDisplayDay);
      day.setDate(day.getDate() + i);
      if (day > lastDisplayDay) break;
      const isNonCurrentMonthDay = isNonCurrentMonth(day);
      const isDisabledDay = isNonCurrentMonthDay || (day.getMonth() !== currentDate.getMonth());
  
      days.push(
        <div
          key={day.toDateString()}
          className={`${isNonCurrentMonth(day) ? 'cursor-not-allowed disabled bg-gray-light' : 'hover:bg-gray active:bg-blue cursor-pointer'}
          ${isInRange(day) ? 'bg-blue' : ''}
          ${currentDate.getDate() === i ? 'bg-yellow' : ''} 
          flex justify-center items-center w-[50px] h-[30px]`}
          onClick={() => {
            if (!isDisabledDay) {
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
          <div className="current-month">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
          <button className="w-[44px] h-[44px] hover:bg-gray disabled cursor-not-allowed">
            {'>'}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-5">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;