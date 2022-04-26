import React from 'react'
import DatePicker from 'react-mobile-datepicker';

function DateTimePickers(props) {
    const dateConfig = {
      hour: {
        caption: "Giờ",
        step: 1,
        format: "hh",
      },
      minute: {
        format: "mm",
        caption: "Phút",
        step: 1,
      },
      date: {
        format: "DD",
        caption: "Ngày",
        step: 1,
      },
      month: {
        format: "MM",
        caption: "Tháng",
        step: 1,
      },
      year: {
        format: "YYYY",
        caption: "Năm",
        step: 1,
      },
    };

    return (
        <DatePicker
            {...props}
            //showCaption={true}
            dateConfig={dateConfig}
        />
    )
}

export default DateTimePickers;