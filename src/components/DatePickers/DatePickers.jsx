import React from 'react'
import DatePicker from 'react-mobile-datepicker';

function DatePickers(props) {
    const dateConfig = {
        'date': {
            format: 'DD',
            caption: 'Ngày',
            step: 1,
        },
        'month': {
            format: "MM",
            caption: 'Tháng',
            step: 1,
        },
        'year': {
            format: 'YYYY',
            caption: 'Năm',
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

export default DatePickers;