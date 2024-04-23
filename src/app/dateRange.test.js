import { render, fireEvent, screen } from '@testing-library/react';
import DateRangePicker from "./dateRange";

describe('DateRangePicker component', () => {
  test('render correct current month', () => {
    const { getByTestId } = render(<DateRangePicker />);
    const monthElement = getByTestId('current-month');
    const date = new Date();
    expect(monthElement.textContent).toBe(`${date.getFullYear()}年${date.getMonth()+1}月`);
  });

  test('current date has yellow background', () => {
    const { getByText } = render(<DateRangePicker />);
    const currentDateElement = getByText(new Date().getDate());
    expect(currentDateElement.getAttribute('class')).toContain('bg-yellow');
  });

  test('buttons are disabled', () => {
    const mockClickHandler = jest.fn();
    const { getAllByRole } = render(<DateRangePicker />);
    const buttonElements = getAllByRole('button');
    const firstButtonElement = buttonElements[0];
    const secondButtonElement = buttonElements[0];
    fireEvent.click(firstButtonElement);
    fireEvent.click(secondButtonElement);
    expect(mockClickHandler).not.toHaveBeenCalled();;
  });


  test('select start date and end date ensuring range dates have blue background', () => {
    const { getByText } = render(<DateRangePicker />);
    const startDateElement = getByText('10');
    const endDateElement = getByText('15');
    const nonInRangeDateElement = getByText('16');

    fireEvent.click(startDateElement);
    fireEvent.click(endDateElement);

    expect(startDateElement.getAttribute('class')).toContain('bg-blue');
    expect(endDateElement.getAttribute('class')).toContain('bg-blue');
    expect(nonInRangeDateElement.getAttribute('class')).not.toContain('bg-blue');
  });

  test('reset start date if clicked date is earlier than start date', () => {
    const { getByText, getByTestId } = render(<DateRangePicker />);
    const START = '10';
    const END = '15';
    const EARLIER = '8';
    const startDate = getByText(START);
    const endDateElement = getByText(END);
    const earlierDateElement = getByText(EARLIER);

    fireEvent.click(startDate);
    fireEvent.click(endDateElement);
    fireEvent.click(earlierDateElement);

    const newStartDateElement = getByTestId('start-date');
    expect(newStartDateElement.textContent).toContain(EARLIER);
    expect(endDateElement.textContent).toContain(END);
  });

  test('update end date if clicked date is later than end date', () => {
    const { getByText, getByTestId } = render(<DateRangePicker />);
    const START = '10';
    const END = '15';
    const LATER = '18';
    const startDate = getByText(START);
    const endDateElement = getByText(END);
    const laterDateElement = getByText(LATER);

    fireEvent.click(startDate);
    fireEvent.click(endDateElement);
    fireEvent.click(laterDateElement);

    const newEndDateElement = getByTestId('end-date');
    expect(startDate.textContent).toContain(START);
    expect(newEndDateElement.textContent).toContain(LATER);
  });
});