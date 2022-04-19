import {
  Block,
  Button,
  Link,
  List,
  ListInput,
  ListItem,
  Navbar,
  PageContent,
  Sheet,
  Toolbar,
  useStore,
} from "framework7-react";
import React, { useState } from "react";
import { DateTimeHelpers } from "../../../helpers/DateTimeHelpers";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";

import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

export default function ItemCalendar({ item, OnCancelBook }) {
  const [SheetOpened, setSheetOpened] = useState(false);
  const { User } = useStore("Auth");

  const loadOptions = () => {};

  return (
    <div className="mt-15px position-relative calendar-item">
      <div className="position-relative">
        <div className="time-school time-school-top fw-500 mb-10px position-relative">
          <div className="time-icon"></div>
          <span className="pl-20px pr-15px bg-white position-relative text-muted text-uppercase">
            {moment(item.CalendarItem.From).format("HH:mm a")}
          </span>
        </div>
        <div className="pl-15px py-10px position-relative">
          <div className="line-status w-2px h-100 bg-primary position-absolute left-0 top-0"></div>
          <div className="text-uppercase fw-600 text-success-ezs line-height-md font-size-md">
            {item.CalendarItem.Teaching?.SchoolTitle || "Chưa có trường"}
          </div>
          <div className="mt-12px fw-600 text-uppercase text-gray-800">
            {item.CalendarItem.Title} - Lớp {item.CalendarItem.ClassMap?.Title}
          </div>
          <div className="mt-12px d--f jc--sb ai--c text-gray-700">
            <div className="fw-600">
              <i className="fa-solid fa-timer"></i>
              <span className="pl-5px">
                {DateTimeHelpers.TotalMinutesFromTo(
                  item.CalendarItem.From,
                  item.CalendarItem.To
                )}{" "}
                Phút
              </span>
            </div>
            <div>
              <Button
                className="btn btn-primary btn-xs fw-500 mr-5px"
                onClick={() => setSheetOpened(true)}
              >
                Chi tiết
              </Button>
              <Button
                className="btn btn-danger btn-xs fw-500"
                onClick={() => OnCancelBook(item)}
              >
                Hủy lịch
              </Button>
            </div>
          </div>
        </div>
        <div className="time-school time-school-bottom fw-500 mt-8px position-relative">
          <div className="time-icon"></div>
          <span className="pl-20px pr-15px bg-white position-relative text-muted text-uppercase">
            {moment(item.CalendarItem.To).format("HH:mm a")}
          </span>
        </div>
      </div>
      <Sheet
        className="sheet-layout"
        opened={SheetOpened}
        onSheetClosed={() => {
          setSheetOpened(false);
        }}
        swipeToClose
        backdrop
      >
        {/*  Scrollable sheet content */}
        <PageContent>
          {console.log(item)}
          <div className="d--f fd--c h-100 bz-bb">
            <div className="border-bottom border-width-2 p-15px sheet-navbar">
              <div className="text-uppercase fw-600">
                {item.CalendarItem.Teaching?.SchoolTitle || "Chưa có trường"}
              </div>
            </div>
            <div className="sheet-page">
              <div className="p-15px">
                <div>
                  <div className="text-uppercase font-size-xs fw-600 text-muted mb-10px">
                    Tiết - Lớp
                  </div>
                  <div className="fw-600">
                    {item.CalendarItem.Title} - Lớp{" "}
                    {item.CalendarItem.ClassMap?.Level}{" "}
                    {item.CalendarItem.ClassMap?.Title}
                  </div>
                </div>
                <div className="mt-15px">
                  <div className="text-uppercase font-size-xs fw-600 text-muted mb-10px">
                    Bài học
                  </div>
                  <div className="fw-600">
                    {item.CalendarItem.Teaching.ProductLessonTitle}
                  </div>
                </div>
                <div className="mt-15px">
                  <div className="text-uppercase font-size-xs fw-600 text-muted mb-10px">
                    Giá viên giảng dạy
                  </div>
                  <div className="fw-600">{User.FullName}</div>
                </div>
              </div>
              <div className="border-top border-width-2 pb-15px">
                <List noHairlinesMd>
                  <ListInput
                    outline
                    label="Sĩ số lớp"
                    floatingLabel
                    type="number"
                    name="USN"
                    placeholder="Nhập sĩ số lớp"
                    //value={values.USN}
                    clearButton
                    //onInputClear={() => setFieldValue("USN", "", false)}
                    className="mt-15px auto-focus"
                    //errorMessage={errors.USN}
                    validate
                    //errorMessageForce={errors.USN && touched.USN}
                    //onChange={handleChange}
                    //onBlur={handleBlur}
                  />
                  <ListInput
                    outline
                    label="Ghi chú"
                    floatingLabel
                    type="text"
                    name="PWD"
                    placeholder="Nhập ghi chú"
                    clearButton
                    //onInputClear={() => setFieldValue("PWD", "", false)}
                    className="mt-15px auto-focus"
                    //errorMessage={errors.PWD}
                    //value={values.PWD}
                    validate
                    // errorMessageForce={errors.PWD && touched.PWD}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                  <div className="px-15px mt-15px">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      options={[
                        { value: "chocolate", label: "Tiết bình thường" },
                        { value: "strawberry", label: "Dự giờ" },
                        { value: "vanilla", label: "Chuyên đề" },
                      ]}
                      menuPlacement="top"
                      isMulti
                      menuIsOpen
                    />
                  </div>
                  <div className="px-15px mt-15px">
                    <AsyncPaginate
                      value={null}
                      loadOptions={loadOptions}
                      menuPosition="fixed"
                      menuPlacement
                    />
                  </div>
                </List>
              </div>
            </div>
            <div className="border-top border-width-2 sheet-toolbar px-15px d--f ai--c jc--c fd--c">
              <Button className="btn btn-black-ezs w-100 text-uppercase">
                Hoàn thành
              </Button>
            </div>
          </div>
        </PageContent>
      </Sheet>
    </div>
  );
}
