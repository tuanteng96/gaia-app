import { ListInput } from "framework7-react";
import React, { useState, Fragment } from "react";
import DatePickers from "../../../../components/DatePickers/DatePickers";
import moment from "moment";
import "moment/dist/locale/vi";

moment.locale("vi");

function DateTake({
  name,
  placeholder,
  value,
  errorMessage,
  errorMessageForce,
  label,
  onSelect,
}) {
  const [OpenDate, setOpenDate] = useState(false);
  return (
    <Fragment>
      <div className="mt-15px auto-focus" onClick={() => setOpenDate(true)}>
        <ListInput
          outline
          label={label}
          floatingLabel
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          className="mt-15px auto-focus"
          errorMessage={errorMessage}
          validate
          errorMessageForce={errorMessageForce}
          readonly
          wrap={false}
        />
      </div>
      <DatePickers
        value={value ? new Date(moment(value).format("DD-MM-YYYY")) : new Date()}
        isOpen={OpenDate}
        theme="ios"
        confirmText="Lưu"
        cancelText="Hủy"
        showCaption={true}
        headerFormat="DD/MM/YYYY"
        onSelect={(date) => {
          setOpenDate(false);
          onSelect(date);
        }}
        onCancel={() => setOpenDate(false)}
      />
    </Fragment>
  );
}

export default DateTake;
