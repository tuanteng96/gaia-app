import React, { useEffect, useState, Fragment } from "react";
import {
  Page,
  Toolbar,
  f7,
  Link,
  NavLeft,
  NavTitle,
  Navbar,
  NavRight,
  Subnavbar,
  useStore,
  Button,
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import DatePickers from "../../components/DatePickers/DatePickers";
import PageEmpty from "../../components/Empty/PageEmpty";
import CalendarApi from "../../api/CalenderApi";
import { toast } from "react-toastify";
import SkeletonPage from "./SkeletonPage";

import moment from "moment";
import "moment/dist/locale/vi";
import ItemCalendar from "./components/ItemCalendar";

moment.locale("vi");

const Calendar = ({ f7router }) => {
  //yyyy-dd-mm
  const { User } = useStore("Auth");
  const [Filters, setFilters] = useState({
    date: new Date(),
    teacherid: User.ID,
  });
  const [OpenDate, setOpenDate] = useState(false);
  const [ListCalendar, setListCalendar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListCalendar();
  }, []);

  const getListCalendar = (
    obj = {
      isLoading: true,
      Filters: Filters,
    },
    callback
  ) => {
    const { isLoading, Filters } = obj;
    isLoading && setLoading(true);
    CalendarApi.getList({
      ...Filters,
      date: moment(Filters.date).format("YYYY-MM-DD"),
    })
      .then(({ data }) => {
        setListCalendar(getChildrenNested(data?.list));
        setLoading(false);
        callback && callback();
      })
      .catch((error) => console.log(error));
  };

  const getChildrenNested = (arrays) => {
    if (!arrays) return [];
    const newArrays = [];
    for (let item of arrays) {
      if (!item.IndexList) return;
      for (let index of item.IndexList) {
        if (!index.dayItems) return;
        for (let day of index.dayItems) {
          const idx = newArrays.findIndex(
            (o) => o.MajorID && o.MajorID === day.MajorID
          );
          if (idx > -1) {
            newArrays[idx].MajorItems.push(day);
          }
          else {
            const newDay = { ...day };
            if (day.MajorID) {
              newDay.MajorItems = [day];
            }
            newArrays.push(newDay);
          }
        }
      }
    }
    return newArrays;
  };

  const OnOpenDate = () => {
    setOpenDate(true);
  };

  const OnHideDate = () => {
    setOpenDate(false);
  };

  const OnChangeDate = (date) => {
    OnHideDate();
    getListCalendar(
      {
        isLoading: true,
        Filters: {
          ...Filters,
          date: date,
        },
      },
      () => {
        setFilters((prevState) => ({
          ...prevState,
          date: date,
        }));
        //f7.dialog.close();
      }
    );
  };

  const OnBackDay = () => {
    //f7.dialog.preloader("Đang tải dữ liệu ...");
    getListCalendar(
      {
        isLoading: true,
        Filters: {
          ...Filters,
          date: moment(Filters.date).add(-1, "days").toDate(),
        },
      },
      () => {
        setFilters((prevState) => ({
          ...prevState,
          date: moment(prevState.date).add(-1, "days").toDate(),
        }));
        //f7.dialog.close();
      }
    );
  };

  const OnNextDay = () => {
    //f7.dialog.preloader("Đang tải dữ liệu ...");
    getListCalendar(
      {
        isLoading: true,
        Filters: {
          ...Filters,
          date: moment(Filters.date).add(1, "days").toDate(),
        },
      },
      () => {
        setFilters((prevState) => ({
          ...prevState,
          date: moment(prevState.date).add(1, "days").toDate(),
        }));
        //f7.dialog.close();
      }
    );
  };

  const loadRefresh = (done) => {
    setTimeout(() => {
      getListCalendar(
        {
          isLoading: false,
          Filters: {
            ...Filters,
          },
        },
        () => {
          done();
        }
      );
    }, 300);
  };

  const OnCancelBook = ({ CalendarItem }) => {
    f7.dialog.confirm("Bạn chắc chắn muốn xin nghỉ tiết này?", function () {
      f7.dialog.prompt("Nhập lý do bạn muốn xin nghỉ ?", async (name) => {
        f7.dialog.preloader("Đang thực hiện ...");
        const obj = {
          Teaching: {
            Desc: name,
            CalendarItemID: CalendarItem.ID,
            ScheduleID: CalendarItem.Teaching?.ScheduleID,
            ProductLessonID: CalendarItem.Teaching?.ProductLessonID,
            SchoolID: CalendarItem.Teaching?.SchoolID,
            SchoolTitle: CalendarItem.Teaching?.SchoolTitle,
            ProductLessonTitle: CalendarItem.Teaching?.ProductLessonTitle,
          },
        };
        CalendarApi.reject(obj)
          .then(({ data }) => {
            getListCalendar(
              {
                isLoading: true,
                Filters: {
                  ...Filters,
                },
              },
              () => {
                if (data.error) {
                  f7.dialog.close();
                  toast.error(data.error, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                  });
                } else {
                  f7.dialog.close();
                  toast.success("Xin nghỉ thành công !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                  });
                }
              }
            );
          })
          .catch((error) => console.log(error));
      });
    });
  };

  const onSubmit = (values) => {
    f7.sheet.close();
    const objSubmit = {
      Teaching: {
        ...values,
        //Type: values.Type ? values.Type.value : "TIET_BINH_THUONG",
        TimesEnd: values.TimesEnd
          ? moment(values.TimesEnd).format("YYYY-MM-DD HH:mm")
          : "",
      },
    };
    f7.dialog.preloader("Đang thực hiện ...");
    CalendarApi.accept(objSubmit)
      .then(({ data }) => {
        if (data.error) {
          f7.dialog.close();
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        } else {
          getListCalendar(
            {
              isLoading: true,
              Filters: {
                ...Filters,
              },
            },
            () => {
              f7.sheet.close();
              f7.dialog.close();
              toast.success("Hoàn thành thành công !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
            }
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Page
      name="calendar"
      className="bg-white page-calendar"
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
      ptr
      //ptrMousewheel={true}
      onPtrRefresh={loadRefresh}
    >
      {/* Top Navbar */}
      <Navbar sliding={false} bgColor="white" innerClass="navbars-bg">
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Lịch giảng dạy</NavTitle>
        <NavRight>
          <Link href="/calendar/take-break/" className="icon-only">
            <div className="text-center position-relative line-height-sm">
              <i className="font-size-h6 fa-regular fa-money-check-pen"></i>
            </div>
          </Link>
        </NavRight>
        <Subnavbar inner={false}>
          <div className="d--f ai--c jc--sb w-100 h-100 px-15px">
            <div className="h-100 d--f ai--c" onClick={OnOpenDate}>
              <span className="pr-10px pl-5px fw-500 font-size-md text-gray-900">
                {moment(Filters.date).format("ddd, ll")}
              </span>
              <i className="fa-regular fa-angle-down"></i>
            </div>
            <div className="d--f">
              <div
                className="bg-light w-30px h-30px d--f ai--c jc--c"
                onClick={OnBackDay}
              >
                <i className="fa-light fa-angle-left"></i>
              </div>
              <div
                className="bg-light w-30px h-30px ml-5px d--f ai--c jc--c"
                onClick={OnNextDay}
              >
                <i className="fa-light fa-angle-right"></i>
              </div>
            </div>
          </div>
        </Subnavbar>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router} />
      </Toolbar>
      {/* Page content */}
      {loading && <SkeletonPage />}
      {!loading && (
        <Fragment>
          {ListCalendar && ListCalendar.length > 0 ? (
            <div className="p-15px">
              {ListCalendar.map((item, index) => (
                <ItemCalendar
                  key={index}
                  item={item}
                  OnCancelBook={OnCancelBook}
                  onSubmit={onSubmit}
                />
              ))}
            </div>
          ) : (
            <div className="h-100 bg-white">
              <PageEmpty Title={"Bạn không lịch giảng dạy."} />
            </div>
          )}
        </Fragment>
      )}
      <DatePickers
        value={Filters.date}
        isOpen={OpenDate}
        onSelect={(date) => OnChangeDate(date)}
        onCancel={OnHideDate}
        isPopup
        theme="ios"
        confirmText="Lưu"
        cancelText="Hủy"
        headerFormat="DD/MM/YYYY"
      />
    </Page>
  );
};
export default Calendar;
