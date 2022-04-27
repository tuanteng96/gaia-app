import {
  Button,
  Link,
  List,
  ListInput,
  PageContent,
  Sheet,
  useStore,
} from "framework7-react";
import React, { useEffect, useState, Fragment } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Formik } from "formik";
import DateTimeTake from "./DateTimeTake";

import moment from "moment";
import "moment/dist/locale/vi";
import DateTake from "./DateTake";
moment.locale("vi");

const TypeLists = [
  { value: "NGHI_THUONG", label: "Nghỉ thường" },
  { value: "NGHI_PHEP", label: "Nghỉ phép" },
];

const TimeTypeLists = [
  { value: "NGHI_SANG", label: "Nghỉ sáng" },
  { value: "NGHI_CHIEU", label: "Nghỉ chiều" },
  { value: "NGHI_NGAY", label: "Nghỉ ngày" },
  { value: "NGHI_NHIEU_NGAY", label: "Nghỉ nhiều ngày" },
  { value: "NGHI_THEO_THOI_GIAN", label: "Nghỉ theo thời gian" },
];

const initialValue = {
  From: "",
  To: "",
  TimeType: "" /*NGHI_SANG,NGHI_CHIEU,NGHI_NGAY, NGHI_NHIEU_NGAY*/,
  Type: "", //NGHI_THUONG, NGHI_PHEP
  Desc: "",
  TeacherID: null,
  TeacherName: "",
  FileList: [],
};

const TakeBreakSchema = Yup.object().shape({
  TimeType: Yup.object().required("Chọn thời gian"),
});

function SheetTakeBreak({ SheetOpened, onHide, defaultValues, onSubmit }) {
  const { User } = useStore("Auth");
  const [initialValues, setInitialValues] = useState(initialValue);

  useEffect(() => {
    if (SheetOpened && defaultValues?.ID) {
      const newObj = {
        ID: defaultValues.ID,
        TeacherID: defaultValues.TeacherID,
        TeacherName: defaultValues.TeacherName,
        Type: defaultValues.Type
          ? TypeLists.filter((item) => item.value === defaultValues.Type)[0]
          : TypeLists[0],
        TimeType: defaultValues.TimeType
          ? TimeTypeLists.filter(
              (item) => item.value === defaultValues.TimeType
            )[0]
          : TimeTypeLists[0],
        Desc: defaultValues.Desc,
        From: defaultValues.From,
        To: defaultValues.To,
      };
      setInitialValues(newObj);
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        TeacherID: User.ID,
        TeacherName: User.FullName,
        Type: TypeLists[0],
        TimeType: TimeTypeLists[0],
      }));
    }
  }, [defaultValues, SheetOpened]);
  
  return (
    <Sheet
      className="sheet-layout"
      opened={SheetOpened}
      onSheetClosed={onHide}
      backdrop
    >
      <PageContent>
        <Formik
          initialValues={initialValues}
          validationSchema={TakeBreakSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formikProps) => {
            const {
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              setFieldValue,
            } = formikProps;
            return (
              <Form className="h-100">
                <div className="border-bottom border-width-2 px-15px sheet-navbar d--f ai--c">
                  <div className="text-uppercase fw-600 font-size-md text-truncate max-w-80">
                    Xin nghỉ giảng dạy
                  </div>
                  <Link className="sheet-close" sheetClose>
                    <i className="fa-light fa-xmark"></i>
                  </Link>
                </div>
                <div className="d--f fd--c bz-bb sheet-body">
                  <div className="border-top border-width-2 pb-15px">
                    <List noHairlinesMd>
                      <div className="px-15px mt-15px">
                        <Select
                          className={`react-select`}
                          classNamePrefix="select"
                          placeholder="Loại"
                          name="Type"
                          options={TypeLists}
                          value={values.Type}
                          onChange={(otp) => setFieldValue("Type", otp, false)}
                          menuPlacement="bottom"
                          noOptionsMessage={({ inputValue }) =>
                            "Không có dữ liệu."
                          }
                        />
                      </div>
                      <div className="px-15px mt-15px">
                        <Select
                          className={`react-select ${
                            errors.TimeType &&
                            touched.TimeType &&
                            "react-select-error"
                          }`}
                          classNamePrefix="select"
                          placeholder="Thời gian nghỉ"
                          name="TimeType"
                          options={TimeTypeLists}
                          value={values.TimeType}
                          onChange={(otp) => {
                            setFieldValue("TimeType", otp, false);
                            setFieldValue("From", "", false);
                            setFieldValue("To", "", false);
                          }}
                          menuPlacement="bottom"
                          noOptionsMessage={({ inputValue }) =>
                            "Không có dữ liệu."
                          }
                        />
                        {errors.TimeType && touched.TimeType && (
                          <div className="react-select-error-message mb-8px">
                            {errors.TimeType}
                          </div>
                        )}
                      </div>
                      {values.TimeType?.value === "NGHI_THEO_THOI_GIAN" && (
                        <Fragment>
                          <DateTimeTake
                            value={
                              values.From
                                ? moment(values.From).format("HH:mm DD-MM-YYYY")
                                : ""
                            }
                            onInputClear={() =>
                              setFieldValue("From", "", false)
                            }
                            errorMessage={errors.From}
                            errorMessageForce={errors.From && touched.From}
                            name="From"
                            placeholder="--:-- --/--/----"
                            label="Thời gian bắt đầu"
                            onSelect={(date) =>
                              setFieldValue("From", date, false)
                            }
                          />
                          <DateTimeTake
                            value={
                              values.To
                                ? moment(values.To).format("HH:mm DD-MM-YYYY")
                                : ""
                            }
                            onInputClear={() => setFieldValue("To", "", false)}
                            errorMessage={errors.To}
                            errorMessageForce={errors.To && touched.To}
                            name="To"
                            placeholder="--:-- --/--/----"
                            label="Thời gian kết thúc"
                            onSelect={(date) =>
                              setFieldValue("To", date, false)
                            }
                          />
                        </Fragment>
                      )}
                      {values.TimeType?.value !== "NGHI_NHIEU_NGAY" &&
                        values.TimeType?.value !== "NGHI_THEO_THOI_GIAN" && (
                          <DateTake
                            value={
                              values.From
                                ? moment(values.From).format("DD-MM-YYYY")
                                : ""
                            }
                            onInputClear={() =>
                              setFieldValue("From", "", false)
                            }
                            errorMessage={errors.From}
                            errorMessageForce={errors.From && touched.From}
                            name="From"
                            placeholder="DD-MM-YYYY"
                            label="Chọn ngày nghỉ"
                            onSelect={(date) =>
                              setFieldValue("From", date, false)
                            }
                          />
                        )}
                      {values.TimeType?.value === "NGHI_NHIEU_NGAY" && (
                        <React.Fragment>
                          <DateTake
                            value={
                              values.From
                                ? moment(values.From).format("DD-MM-YYYY")
                                : ""
                            }
                            onInputClear={() =>
                              setFieldValue("From", "", false)
                            }
                            errorMessage={errors.From}
                            errorMessageForce={errors.From && touched.From}
                            name="From"
                            placeholder="DD-MM-YYYY"
                            label="Ngày bắt đầu"
                            onSelect={(date) =>
                              setFieldValue("From", date, false)
                            }
                          />
                          <DateTake
                            value={
                              values.To
                                ? moment(values.From).format("DD-MM-YYYY")
                                : ""
                            }
                            onInputClear={() => setFieldValue("To", "", false)}
                            errorMessage={errors.From}
                            errorMessageForce={errors.From && touched.From}
                            name="To"
                            placeholder="DD-MM-YYYY"
                            label="Ngày kết thúc"
                            onSelect={(date) =>
                              setFieldValue("To", date, false)
                            }
                          />
                        </React.Fragment>
                      )}
                      <ListInput
                        outline
                        label="Ghi chú"
                        floatingLabel
                        type="text"
                        name="Desc"
                        placeholder="Nhập ghi chú"
                        clearButton
                        onInputClear={() => setFieldValue("Desc", "", false)}
                        className="mt-15px auto-focus"
                        errorMessage={errors.Desc}
                        value={values.Desc}
                        validate
                        errorMessageForce={errors.Desc && touched.Desc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </List>
                  </div>
                  {defaultValues &&
                    defaultValues.ConfirmUserID &&
                    defaultValues.ConfirmDesc && (
                      <div className="p-15px border-top">
                        <div className="fw-500 line-height-sm">Phản hồi</div>
                        <div className="line-height-sm text-italic mt-3px">
                          {defaultValues.ConfirmDesc}
                        </div>
                      </div>
                    )}
                </div>
                <div className="border-top border-width-2 sheet-toolbar px-15px d--f ai--c jc--c fd--c">
                  <Button
                    type="submit"
                    className="btn btn-success-ezs w-100 text-uppercase"
                    disabled={
                      defaultValues &&
                      defaultValues.ConfirmUserID &&
                      defaultValues.ConfirmStatus
                    }
                  >
                    {values.ID ? "Lưu thay đổi" : "Xin nghỉ"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </PageContent>
    </Sheet>
  );
}

export default SheetTakeBreak;
