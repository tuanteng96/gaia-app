import React from 'react'
import DatePicker from 'react-mobile-datepicker';

function TimePickers(props) {
    const dateConfig = {
        'hour': {
            caption: 'Giờ',
            step: 1,
            format: "hh",
        },
        'minute': {
            format: 'mm',
            caption: 'Phút',
            step: 1,
        },
        'second': {
            format: 'ss',
            caption: 'Giây',
            step: 1,
        },
    };

    return ( <
        DatePicker {...props }
        //showCaption={true}
        dateConfig = { dateConfig }
        />
    )
}

export default TimePickers;