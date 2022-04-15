import React, { useEffect, useState, useRef, Fragment } from "react";
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
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import DatePickers from "../../components/DatePickers/DatePickers";
import moment from "moment";
import "moment/dist/locale/vi";
import PageEmpty from "../../components/Empty/PageEmpty";
moment.locale("vi");

const Calendar = ({ f7router }) => {

  const [Filters, setFilters] = useState({
    From: new Date()
  })
  const [OpenDate, setOpenDate] = useState(false);
  const [ListCalendar, setListCalendar] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const allowInfinite = useRef(true);

  const OnOpenDate = () => {
    setOpenDate(true);
  }

  const OnHideDate = () => {
    setOpenDate(false);
  }

  const OnChangeDate = (date) => {
    OnHideDate();
    f7.dialog.preloader("Đang tải dữ liệu ...");
    setTimeout(() => {
      setFilters((prevState) => ({ ...prevState, From: date }));
      f7.dialog.close();
    }, 1000);
  }

  const OnBackDay = () => {
    f7.dialog.preloader("Đang tải dữ liệu ...");
    setTimeout(() => {
      setFilters((prevState) => ({ ...prevState, From: moment(prevState.From).add(-1, 'days').toDate() }));
      f7.dialog.close();
    }, 1000);
  }

  const OnNextDay = () => {
    f7.dialog.preloader("Đang tải dữ liệu ...");
    setTimeout(() => {
      setFilters((prevState) => ({ ...prevState, From: moment(prevState.From).add(1, 'days').toDate() }));
      f7.dialog.close();
    }, 1000);
  }

  const loadRefresh = (done) => {
    setTimeout(() => {
      allowInfinite.current = true;
      done();
    }, 1000);
  };

  const loadMore = () => {
    // if (!allowInfinite.current) return;
    // allowInfinite.current = false;
    // if (ListTotal >= PageTotal) {
    //   setShowPreloader(false);
    //   return;
    // }
    // setShowPreloader(true);
    // const newFilters = { ...Filters, Pi: Filters.Pi + 1 };
    // getListNotification(
    //   { isLoading: false, Filters: newFilters, refresh: false },
    //   () => {
    //     allowInfinite.current = true;
    //   }
    // );
  };

  return (
    <Page
      name="calendar"
      className="bg-white"
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
      ptr
      //ptrMousewheel={true}
      onPtrRefresh={loadRefresh}
      infinite
      infiniteDistance={50}
      infinitePreloader={showPreloader}
      onInfinite={loadMore}
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
              <span className="pr-10px pl-5px fw-500 font-size-md text-gray-900">{moment(Filters.From).format("ddd, ll")}</span>
              <i className="fa-regular fa-angle-down"></i>
            </div>
            <div className="d--f">
              <div className="bg-light w-30px h-30px d--f ai--c jc--c" onClick={OnBackDay}>
                <i className="fa-light fa-angle-left"></i>
              </div>
              <div className="bg-light w-30px h-30px ml-5px d--f ai--c jc--c" onClick={OnNextDay}>
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
          {
            ListCalendar && ListCalendar.length > 0 ? (
              <div className="p-15px">
                <div className="shadows bg-white p-15px d--f ai--c jc--c mb-15px rounded-sm">
                  <div className="w-45px">
                    <img className="w-100 h-45px rounded-circle" src="https://salt.tikicdn.com/ts/product/5f/e1/30/5c1190efb9740f489b163a123b9076c1.jpg" alt="" />
                  </div>
                  <div className="f--1 pl-15px">
                    <div className="fw-500 font-size-md mb-6px line-height-sm">Trường THCS Minh Sơn</div>
                    <div className="d--f">
                      <div className="text-gray-800">
                        <i className="fa-regular fa-paste pr-5px font-size-smm"></i>
                        <span className="font-size-sm">Tiết 3</span>
                      </div>
                      <div className="pl-15px">
                        <i className="fa-regular fa-clock-eight pr-5px font-size-smm"></i>
                        <span className="font-size-sm">8:30 AM - 9:15 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-30px text-right">
                    <i className="fa-light fa-chevron-right font-size-xl text-muted"></i>
                  </div>
                </div>
                <div className="shadows bg-white p-15px d--f ai--c jc--c mb-15px rounded-sm">
                  <div className="w-45px">
                    <img className="w-100 h-45px rounded-circle" src="https://salt.tikicdn.com/ts/product/5f/e1/30/5c1190efb9740f489b163a123b9076c1.jpg" alt="" />
                  </div>
                  <div className="f--1 pl-15px">
                    <div className="fw-500 font-size-md mb-6px line-height-sm">Trường THCS Dân Lực</div>
                    <div className="d--f">
                      <div className="text-gray-800">
                        <i className="fa-regular fa-paste pr-5px font-size-smm"></i>
                        <span className="font-size-sm">Tiết 6</span>
                      </div>
                      <div className="pl-15px">
                        <i className="fa-regular fa-clock-eight pr-5px font-size-smm"></i>
                        <span className="font-size-sm">8:30 AM - 9:15 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-30px text-right">
                    <i className="fa-light fa-chevron-right font-size-xl text-muted"></i>
                  </div>
                </div>
                <div className="shadows bg-white p-15px d--f ai--c jc--c mb-15px rounded-sm">
                  <div className="w-45px">
                    <img className="w-100 h-45px rounded-circle" src="https://salt.tikicdn.com/ts/product/5f/e1/30/5c1190efb9740f489b163a123b9076c1.jpg" alt="" />
                  </div>
                  <div className="f--1 pl-15px">
                    <div className="fw-500 font-size-md mb-6px line-height-sm">Trường THCS Hợp Lý</div>
                    <div className="d--f">
                      <div className="text-gray-800">
                        <i className="fa-regular fa-paste pr-5px font-size-smm"></i>
                        <span className="font-size-sm">Tiết 1</span>
                      </div>
                      <div className="pl-15px">
                        <i className="fa-regular fa-clock-eight pr-5px font-size-smm"></i>
                        <span className="font-size-sm">8:30 AM - 9:15 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-30px text-right">
                    <i className="fa-light fa-chevron-right font-size-xl text-muted"></i>
                  </div>
                </div>
              </div>
            ) : (<div class="h-100 bg-white"><PageEmpty Title={"Bạn không lịch giảng dạy."} /></div>)
          }
        </Fragment>
      )}
      <DatePickers
        value={Filters.From}
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
