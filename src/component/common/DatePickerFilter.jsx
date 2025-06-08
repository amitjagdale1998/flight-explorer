import React from "react";
import { DatePicker, Space } from "antd";

const DatePickerFilter = ({ setSelectedDate }) => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDate(dateString);
  };
  return (
    <Space direction="vertical">
      <DatePicker onChange={onChange} />
    </Space>
  );
};
export default DatePickerFilter;
