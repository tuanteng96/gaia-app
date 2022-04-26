import { ListInput } from "framework7-react";
import React, { Fragment, useState } from "react";
import DateTimePickers from "../../../../components/DateTimePickers/DateTimePickers";

function DateTimeTake({
  name,
  placeholder,
  value,
  errorMessage,
  errorMessageForce,
  label,
  onSelect,
}) {
  const [TimeOpened, setTimeOpened] = useState(false);
  return (
    <Fragment>
      <div className="mt-15px auto-focus" onClick={() => setTimeOpened(true)}>
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
      <DateTimePickers
        isOpen={TimeOpened}
        theme="ios"
        confirmText="Lưu"
        cancelText="Hủy"
        showCaption={true}
        headerFormat="hh:mm DD/MM/YYYY"
        onSelect={(date) => {
          setTimeOpened(false);
          onSelect(date);
        }}
        onCancel={() => setTimeOpened(false)}
      />
    </Fragment>
  );
}

export default DateTimeTake;
