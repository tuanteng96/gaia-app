import {
  Block,
  Button,
  Input,
  Link,
  List,
  ListInput,
  ListItem,
  PageContent,
  Sheet,
  useStore,
} from "framework7-react";
import React, { useEffect, useState } from "react";
import { DateTimeHelpers } from "../../../helpers/DateTimeHelpers";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";
import * as Yup from "yup";
import WareHouseApi from "../../../api/WareHouseApi";
import { FieldArray, Form, Formik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";

import moment from "moment";
import "moment/dist/locale/vi";
import UploadImages from "../../../components/UploadImages/UploadImages";
import TimePickers from "../../../components/TimePickers/TimePickers";
import { toAbsoluteUrl } from "../../../helpers/AssetsHelpers";
moment.locale("vi");

const initialValue = {
  StudentCount: "",
  Desc: "",
  Type: "",
  TimesEnd: "",
  TeachingItemList: {
    Items: [],
  },
  ThumbnailList: []
};

const CalendarSchema = Yup.object().shape({
  TimesEnd: Yup.string().required("Nhập giờ kết thúc."),
  StudentCount: Yup.string().required("Nhập sĩ số."),
});

const TypeLists = [
  { value: "TIET_BINH_THUONG", label: "Tiết bình thường" },
  { value: "DU_GIO", label: "Dự giờ" },
  { value: "CHUYEN_DE", label: "Chuyên đề" },
];

export default function ItemCalendar({ item, OnCancelBook, onSubmit }) {
  const [SheetOpened, setSheetOpened] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValue);
  const [SelecedOption, setSelecedOption] = useState(null);
  const [TimeOpened, setTimeOpened] = useState(false);
  const { User } = useStore("Auth");

  useEffect(() => {
    if (item) {
      const { CalendarItem } = item;
      const newObj = {
        TeachingItemList: {
          Items: [],
        },
        StudentCount: CalendarItem.Teaching?.StudentCount || "",
        Thumbnail: "",
        Desc: CalendarItem.Teaching?.Desc || "",
        Type: CalendarItem.Teaching?.Type
          ? TypeLists.filter(
            (item) => item.value === CalendarItem.Teaching?.Type
          )[0]
          : TypeLists[0],
        TimesEnd: CalendarItem.Teaching?.TimesEnd || "",
        CalendarItemID: CalendarItem.ID,
        ScheduleID: CalendarItem.Teaching?.ScheduleID,
        ProductLessonID: CalendarItem.Teaching?.ProductLessonID,
        SchoolID: CalendarItem.Teaching?.SchoolID,
        SchoolTitle: CalendarItem.Teaching?.SchoolTitle,
        ProductLessonTitle: CalendarItem.Teaching?.ProductLessonTitle,
        ThumbnailList: CalendarItem.Teaching?.ThumbnailList || []
      };
      setInitialValues(newObj);
    }
  }, [item]);

  const loadOptions = async (search, loadedOptions, { page }) => {
    const newPost = {
      _key: search,
      _teacherid: User.ID,
      _pi: page,
      _ps: 4,
    };

    const { data } = await WareHouseApi.getList(newPost);
    const { list, pcount } = data;
    const newData =
      list && list.length > 0
        ? list.map((item) => ({
          ...item,
          label: item.Title,
          value: item.ID,
        }))
        : [];
    return {
      options: newData,
      hasMore: page < pcount,
      additional: {
        page: page + 1,
      },
    };
  };

  const isDisabled = (item) => {
    if (!item) return true;
    const dateCurrent = moment().format("YYYY-MM-DD");
    const DayMaps = moment(item.CalendarItem?.DayMap).format("YYYY-MM-DD");
    return moment(dateCurrent).diff(DayMaps, "day") > 0;
  }
  console.log(item);
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
          <div
            className={`line-status w-2px h-100 position-absolute left-0 top-0 ${item.CalendarItem.Teaching?.Status === "" ? "bg-primary" : ""
              } ${item.CalendarItem.Teaching?.Status === "TU_CHOI"
                ? "bg-danger"
                : ""
              } ${item.CalendarItem.Teaching?.Status === "NHAN_TIET"
                ? "bg-success"
                : ""
              }`}
          ></div>
          <div className="text-uppercase fw-600 text-success-ezs line-height-md font-size-md">
            {item.CalendarItem.Teaching?.SchoolTitle || "Chưa có trường"}
          </div>
          <div className="mt-12px fw-600 text-uppercase text-gray-800">
            {item.CalendarItem.Title} - Lớp {item.CalendarItem.ClassMap?.Level}{item.CalendarItem.ClassMap?.Title}
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
            {item.CalendarItem.Teaching?.Status === "TU_CHOI" && (
              <div className="d--f ai--c">
                <div className="fw-600 text-danger text-italic pr-15px">
                  Đã xin nghỉ
                </div>
                <Button
                  className="btn btn-primary btn-xs fw-500 mr-5px"
                  onClick={() => setSheetOpened(true)}
                >
                  Chi tiết
                </Button>
              </div>
            )}
            {item.CalendarItem.Teaching?.Status === "" && (
              <div>
                <Button
                  className="btn btn-primary btn-xs fw-500 mr-5px"
                  onClick={() => setSheetOpened(true)}
                >
                  Chi tiết
                </Button>
                {!isDisabled(item) && (
                  <Button
                    className="btn btn-danger btn-xs fw-500"
                    onClick={() => OnCancelBook(item)}
                  >
                    Xin nghỉ
                  </Button>
                )}
              </div>
            )}
            {item.CalendarItem.Teaching?.Status === "NHAN_TIET" && (
              <div className="d--f ai--c">
                <div className="fw-600 text-success text-italic pr-15px">
                  Đã hoàn thành
                </div>
                <Button
                  className="btn btn-primary btn-xs fw-500 mr-5px"
                  onClick={() => setSheetOpened(true)}
                >
                  Chi tiết
                </Button>
              </div>
            )}
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
        backdrop
      >
        {/*  Scrollable sheet content */}
        <PageContent>
          <Formik
            initialValues={initialValues}
            validationSchema={CalendarSchema}
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
                      {item.CalendarItem.Teaching?.SchoolTitle ||
                        "Chưa có trường"}
                    </div>
                    <Link className="sheet-close" sheetClose>
                      <i className="fa-light fa-xmark"></i>
                    </Link>
                  </div>
                  <div className="d--f fd--c bz-bb sheet-body">
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
                        <li
                          className="mt-15px auto-focus"
                          onClick={() => setTimeOpened(true)}
                        >
                          <ListInput
                            outline
                            label="Giờ kết thúc"
                            floatingLabel
                            type="text"
                            name="TimesEnd"
                            placeholder="--:-- --"
                            value={
                              values.TimesEnd
                                ? moment(values.TimesEnd).format("HH:mm:ss")
                                : ""
                            }
                            clearButton
                            onInputClear={() =>
                              setFieldValue("TimesEnd", "", false)
                            }
                            className="mt-15px auto-focus"
                            errorMessage={errors.TimesEnd}
                            validate
                            errorMessageForce={
                              errors.TimesEnd && touched.TimesEnd
                            }
                            readonly
                            wrap={false}
                          />
                        </li>
                        <TimePickers
                          isOpen={TimeOpened}
                          theme="ios"
                          confirmText="Lưu"
                          cancelText="Hủy"
                          showCaption={true}
                          headerFormat="hh:mm"
                          onSelect={(date) => {
                            setTimeOpened(false);
                            setFieldValue("TimesEnd", date, false);
                          }}
                          onCancel={() => setTimeOpened(false)}
                        />
                        <ListInput
                          outline
                          label="Sĩ số lớp"
                          floatingLabel
                          type="number"
                          name="StudentCount"
                          placeholder="Nhập sĩ số lớp"
                          value={values.StudentCount}
                          clearButton
                          onInputClear={() =>
                            setFieldValue("StudentCount", "", false)
                          }
                          className="mt-15px auto-focus"
                          errorMessage={errors.StudentCount}
                          validate
                          errorMessageForce={
                            errors.StudentCount && touched.StudentCount
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
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
                        <div className="px-15px mt-15px">
                          <Select
                            className="react-select"
                            classNamePrefix="select"
                            placeholder="Loại"
                            name="Type"
                            options={TypeLists}
                            value={values.Type}
                            onChange={(otp) =>
                              setFieldValue("Type", otp, false)
                            }
                            menuPlacement="top"
                            noOptionsMessage={({ inputValue }) =>
                              "Không có dữ liệu."
                            }
                          />
                        </div>
                        <FieldArray
                          name="TeachingItemList.Items"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              <div className="px-15px mt-15px d--f">
                                <AsyncPaginate
                                  className="react-select f--1 mr-5px"
                                  classNamePrefix="select"
                                  value={SelecedOption}
                                  loadOptions={loadOptions}
                                  placeholder="Chọn giáo cụ sử dụng"
                                  menuPlacement="top"
                                  additional={{
                                    page: 1,
                                  }}
                                  noOptionsMessage={({ inputValue }) =>
                                    "Không có dữ liệu."
                                  }
                                  onChange={(otp) => setSelecedOption(otp)}
                                />
                                <button
                                  className="btn btn-primary shadows text-uppercase w-45px h-48px"
                                  type="button"
                                  onClick={() => {
                                    if (SelecedOption) {
                                      arrayHelpers.push({
                                        ID: SelecedOption.ID,
                                        Desc: "",
                                        Qty: 1,
                                        Title: SelecedOption.Title,
                                      });
                                      setSelecedOption(null);
                                    }
                                  }}
                                >
                                  <i className="fa-regular fa-plus"></i>
                                </button>
                              </div>
                              <div className="px-15px mt-15px">
                                {values.TeachingItemList &&
                                  values.TeachingItemList.Items.map(
                                    (item, index) => (
                                      <div
                                        className="bg-light pl-12px d--f ai--c mt-8px"
                                        key={index}
                                      >
                                        <div className="f--1">
                                          <div className="text-truncate font-size-sm fw-500 line-height-sm pr-12px">
                                            {item.Title}
                                          </div>
                                        </div>
                                        <div className="d--f ai--c rounded w-125px">
                                          <Input
                                            name={`TeachingItemList.Items[${index}].Qty`}
                                            value={item.Qty}
                                            className="bg-white border-top border-bottom border-light border-width-2 text-center f--1"
                                            type="number"
                                            placeholder="SL"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            min={0}
                                            max={100}
                                          />
                                          <div
                                            className="close py-15px text-center w-45px"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            <i className="fa-regular fa-trash-can text-danger"></i>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </React.Fragment>
                          )}
                        />
                      </List>
                    </div>
                    <div className="border-top border-width-2 p-15px d--f fw--w">
                      <FieldArray
                        name="ThumbnailList"
                        render={(arrayHelpers) => (
                          <React.Fragment>
                            {
                              values.ThumbnailList && values.ThumbnailList.map((item, index) => (
                                <div className="w-80px h-80px mr-15px position-relative" key={index}>
                                  <LazyLoadImage
                                    className="w-100 d-block shadows rounded-sm object-fit-cover"
                                    src={toAbsoluteUrl(item)}
                                    height={80}
                                    effect="blur"
                                  />
                                  <div className="position-absolute w-25px h-25px shadows rounded-circle bg-white d--f ai--c jc--c top--10px right--10px" onClick={() => arrayHelpers.remove(index)}><i className="fa-solid fa-xmark"></i></div>
                                </div>
                              ))
                            }
                            <div>
                              <UploadImages
                                onChange={(image) =>
                                  arrayHelpers.push(image)
                                }
                              />
                            </div>
                          </React.Fragment>
                        )}
                      />
                    </div>
                  </div>
                  <div className="border-top border-width-2 sheet-toolbar px-15px d--f ai--c jc--c fd--c">
                    <Button
                      type="submit"
                      className="btn btn-success-ezs w-100 text-uppercase"
                      disabled={
                        item.CalendarItem.Teaching?.Status === "TU_CHOI" ||
                        isDisabled(item)
                      }
                    >
                      {item.CalendarItem.Teaching?.Status === "NHAN_TIET" ? "Lưu thay đổi" : "Hoàn thành"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </PageContent>
      </Sheet>
    </div>
  );
}
