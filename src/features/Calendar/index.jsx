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
          } else {
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
    //f7.dialog.preloader("??ang t???i d??? li???u ...");
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
    //f7.dialog.preloader("??ang t???i d??? li???u ...");
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

  const OnCancelBook = (item) => {
    const dayItemIDs =
      item?.MajorID > 0
        ? item?.MajorItems.map((major) => major.ID)
        : [item?.ID];
    f7.dialog.confirm("B???n ch???c ch???n mu???n xin ngh??? ti???t n??y?", function () {
      f7.dialog.prompt("Nh???p l?? do b???n mu???n xin ngh??? ?", async (name) => {
        f7.dialog.preloader("??ang th???c hi???n ...");
        const obj = {
          Teachings: dayItemIDs.map((itemID) => ({
            Desc: name,
            CalendarItemID: item.CalendarItemID,
            ScheduleID: item.Teaching?.ScheduleID,
            ProductLessonID: item.Teaching?.ProductLessonID,
            SchoolID: item?.SchoolID,
            SchoolTitle: item?.SchoolTitle,
            ProductLessonTitle: item.Teaching?.ProductLessonTitle,
            dayItemID: itemID,
            Status: "TU_CHOI",
          })),
        };
        CalendarApi.accept(obj)
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
                  toast.success("Xin ngh??? th??nh c??ng !", {
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
      Teachings: values?.dayItemIDs.map((itemID) => ({
        ...values,
        //Type: values.Type ? values.Type.value : "TIET_BINH_THUONG",
        TimesEnd: values.TimesEnd
          ? moment(values.TimesEnd).format("YYYY-MM-DD HH:mm")
          : "",
        Status: "HOAN_THANH",
        dayItemID: itemID,
      })),
    };
    f7.dialog.preloader("??ang th???c hi???n ...");
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
              toast.success("Ho??n th??nh th??nh c??ng !", {
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
        <NavTitle sliding={true}>L???ch gi???ng d???y</NavTitle>
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
              <PageEmpty Title={"B???n kh??ng l???ch gi???ng d???y."} />
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
        confirmText="L??u"
        cancelText="H???y"
        headerFormat="DD/MM/YYYY"
      />
    </Page>
  );
};
export default Calendar;
