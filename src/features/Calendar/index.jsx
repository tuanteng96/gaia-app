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
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import DatePickers from "../../components/DatePickers/DatePickers";
import moment from "moment";
import "moment/dist/locale/vi";
import PageEmpty from "../../components/Empty/PageEmpty";
import CalendarApi from "../../api/CalenderApi";
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
        setListCalendar(data);
        setLoading(false);
        callback && callback();
      })
      .catch((error) => console.log(error));
  };

  const OnOpenDate = () => {
    setOpenDate(true);
  };

  const OnHideDate = () => {
    setOpenDate(false);
  };

  const OnChangeDate = (date) => {
    OnHideDate();
    f7.dialog.preloader("Đang tải dữ liệu ...");
    setTimeout(() => {
      setFilters((prevState) => ({ ...prevState, date: date }));
      f7.dialog.close();
    }, 1000);
  };

  const OnBackDay = () => {
    f7.dialog.preloader("Đang tải dữ liệu ...");
    setTimeout(() => {
      setFilters((prevState) => ({
        ...prevState,
        date: moment(prevState.date).add(-1, "days").toDate(),
      }));
      f7.dialog.close();
    }, 1000);
  };

  const OnNextDay = () => {
    f7.dialog.preloader("Đang tải dữ liệu ...");
    setTimeout(() => {
      setFilters((prevState) => ({
        ...prevState,
        date: moment(prevState.date).add(1, "days").toDate(),
      }));
      f7.dialog.close();
    }, 1000);
  };

  const loadRefresh = (done) => {
    setTimeout(() => {
      done();
    }, 1000);
  };

  console.log(ListCalendar);

  return (
    <Page
      name="calendar"
      className="bg-white"
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
          <Link href="/notification/" className="icon-only">
            <div className="text-center position-relative line-height-sm">
              <i className="font-size-h6 fa-regular fa-bell"></i>
              <div className="position-absolute w-6px h-6px border border-white rounded-circle bg-success shadow top-0 right-0"></div>
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
      {loading && "Đang tải"}
      {!loading && (
        <Fragment>
          {ListCalendar && ListCalendar.length > 0 ? (
            <div className="p-15px">
              {ListCalendar.map((item, index) => (
                <div
                  className="shadows bg-white p-15px d--f ai--c jc--c mb-15px rounded-sm"
                  key={index}
                >
                  <div className="f--1">
                    <div className="fw-500 font-size-md mb-6px line-height-sm">
                      {item.CalendarItem?.Teaching?.SchoolTitle || "Chưa có tên"}
                    </div>
                    <div className="d--f">
                      <div className="text-gray-800">
                        <i className="fa-regular fa-clock-eight pr-5px font-size-smm"></i>
                        <span className="font-size-sm">
                          {item.CalendarItem?.Title}
                        </span>
                      </div>
                      <div className="pl-15px">
                        <i className="fa-regular fa-paste pr-5px font-size-smm"></i>
                        <span className="font-size-sm">Lớp 9A</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-30px text-right">
                    <i className="fa-light fa-chevron-right font-size-xl text-muted"></i>
                  </div>
                </div>
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
