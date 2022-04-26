import React, { useEffect, useState, Fragment, useRef } from "react";
import {
  Page,
  Toolbar,
  f7,
  Link,
  NavLeft,
  NavTitle,
  Navbar,
  NavRight,
  Fab,
  Icon,
  useStore,
  List,
  Button,
} from "framework7-react";
import PromHelpers from "../../../../helpers/PromHelpers";
import ToolbarControls from "../../../../components/Toolbar/ToolbarControls";
import PageEmpty from "../../../../components/Empty/PageEmpty";
import CalendarApi from "../../../../api/CalenderApi";
import { toast } from "react-toastify";
import SheetTakeBreak from "./SheetTakeBreak";
import SkeletonTakeBreak from "./SkeletonTakeBreak";

import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

const TakeBreak = ({ f7router }) => {
  const { User } = useStore("Auth");
  const [Filters, setFilter] = useState({
    TeacherID: User.ID,
    _orders: {
      id: true,
    },
    _pi: 1,
    _ps: 5,
  });
  const [ListReject, setListReject] = useState([]);
  const [SheetOpened, setSheetOpened] = useState(false);
  const [PageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValue] = useState(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const allowInfinite = useRef(true);

  useEffect(() => {
    getListReject();
  }, []);

  const getListReject = (
    obj = { isLoading: true, refresh: false, Filters: Filters },
    callback
  ) => {
    const { isLoading, refresh, Filters } = obj;
    isLoading && setLoading(true);
    CalendarApi.getListRejectTeacher(Filters)
      .then(({ data }) => {
        const { list, pi, total } = data;
        if (refresh) {
          setListReject((prevState) => [...list]);
        } else {
          setListReject((prevState) => [...prevState, ...list]);
        }
        setFilter({ ...Filters, _pi: pi });
        setPageTotal(total);
        setLoading(false);
        callback && callback();
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = (values) => {
    f7.dialog.preloader("Đang thực hiện ...");
    const newObj = {
      ...values,
      TimeType: values.TimeType?.value,
      Type: values.Type?.value,
    };
    if (newObj.TimeType === "NGHI_SANG") {
      newObj.From = `${moment(newObj.From).format("YYYY-MM-DD")} 06:00:00`;
      newObj.To = `${moment(newObj.From).format("YYYY-MM-DD")} 12:00:00`;
    }
    if (newObj.TimeType === "NGHI_CHIEU") {
      newObj.From = `${moment(newObj.From).format("YYYY-MM-DD")} 12:00:00`;
      newObj.To = `${moment(newObj.From).format("YYYY-MM-DD")} 18:00:00`;
    }
    if (newObj.TimeType === "NGHI_NGAY") {
      newObj.From = `${moment(newObj.From).format("YYYY-MM-DD")} 00:00:00`;
      newObj.To = `${moment(newObj.From).format("YYYY-MM-DD")} 23:59:00`;
    }
    if (newObj.TimeType === "NGHI_NHIEU_NGAY") {
      newObj.From = moment(newObj.From).format("YYYY-MM-DD HH:mm");
      newObj.To = moment(newObj.To).format("YYYY-MM-DD HH:mm");
    }

    CalendarApi.rejectTeacher(newObj)
      .then(({ data }) => {
        if (data) {
          setTimeout(() => {
            getListReject(
              {
                isLoading: false,
                refresh: true,
                Filters: {
                  ...Filters,
                },
              },
              () => {
                f7.dialog.close();
                OnHideSheet();
                toast.success(
                  newObj.ID
                    ? "Xin nghỉ đã được chỉnh sửa thành công."
                    : "Xin nghỉ đã được gửi thành công.",
                  {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                  }
                );
              }
            );
          }, 300);
        }
      })
      .catch((error) => console.log(error));
  };

  const OnOpenSheet = (item) => {
    setDefaultValue(item);
    setSheetOpened(true);
  };
  const OnHideSheet = () => {
    setDefaultValue(null);
    setSheetOpened(false);
  };

  const loadRefresh = (done) => {
    setTimeout(() => {
      getListReject(
        {
          isLoading: false,
          refresh: true,
          Filters: {
            ...Filters,
            _pi: 1,
          },
        },
        () => {
          done();
          allowInfinite.current = true;
        }
      );
    }, 300);
  };

  const loadMore = () => {
    if (!allowInfinite.current) return;
    allowInfinite.current = false;
    if (ListReject.length >= PageTotal) {
      setShowPreloader(false);
      return;
    }
    setShowPreloader(true);
    const newFilters = { ...Filters, _pi: Filters._pi + 1 };
    getListReject(
      { isLoading: false, Filters: newFilters, refresh: false },
      () => {
        allowInfinite.current = true;
      }
    );
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
      infinite
      infiniteDistance={50}
      infinitePreloader={showPreloader}
      onInfinite={loadMore}
    >
      {/* Top Navbar */}
      <Navbar sliding={false} bgColor="white" innerClass="navbars-bg">
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Xin nghỉ</NavTitle>
        <NavRight>
          <Link href="/notification/" className="icon-only">
            <div className="text-center position-relative line-height-sm">
              <i className="font-size-h6 fa-regular fa-bell"></i>
              <div className="position-absolute w-6px h-6px border border-white rounded-circle bg-success shadow top-0 right-0"></div>
            </div>
          </Link>
        </NavRight>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router} />
      </Toolbar>
      {/* Page content */}
      <Fab position="right-bottom" slot="fixed" onClick={OnOpenSheet}>
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
      </Fab>

      {loading && <SkeletonTakeBreak />}
      {!loading && (
        <Fragment>
          {ListReject && ListReject.length > 0 ? (
            <div className="py-15px">
              <div className="timeline m-0">
                {ListReject.map((item, index) => (
                  <div
                    className={`timeline-item ${
                      ListReject.length - 1 === index && "pb-0"
                    }`}
                    key={index}
                  >
                    <div className="timeline-item-date line-height-sm fw-500">
                      {moment(item.CreateDate).format("ll")}
                    </div>
                    <div className="timeline-item-divider" />
                    <div className="timeline-item-content w-100">
                      <div className="timeline-item-inner p-0">
                        <div className="border p-15px rounded">
                          <div className="mb-12px">
                            <div className="text-uppercase text-muted fw-500 font-size-xs">
                              Ngày xin nghỉ -{" "}
                              {item.Type === "NGHI_PHEP"
                                ? "Nghỉ phép"
                                : "Nghỉ thường"}
                            </div>
                            <div className="mt-5px fw-600 line-height-sm">
                              {item.TimeType === "NGHI_SANG" && (
                                <span>
                                  Sáng
                                  <span className="text-capitalize px-3px">
                                    {moment(item.From).format("dddd")},
                                  </span>
                                  Ngày {moment(item.From).format("DD.MM.YYYY")}
                                </span>
                              )}
                              {item.TimeType === "NGHI_CHIEU" && (
                                <span>
                                  Chiều
                                  <span className="text-capitalize px-3px">
                                    {moment(item.From).format("dddd")},
                                  </span>
                                  Ngày {moment(item.From).format("DD.MM.YYYY")}
                                </span>
                              )}
                              {item.TimeType === "NGHI_NGAY" && (
                                <span>
                                  Ngày {moment(item.From).format("DD.MM.YYYY")}
                                </span>
                              )}
                              {item.TimeType === "NGHI_NHIEU_NGAY" && (
                                <span>
                                  Từ
                                  <span className="text-capitalize px-5px">
                                    {moment(item.From).format(
                                      "HH:mm DD.MM.YYYY"
                                    )}
                                  </span>
                                  đến
                                  <span className="text-capitalize pl-5px">
                                    {moment(item.To).format("HH:mm DD.MM.YYYY")}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mb-12px">
                            <div className="text-uppercase text-muted fw-500 font-size-xs">
                              Ghi chú
                            </div>
                            <div className="mt-5px fw-600 line-height-sm">
                              {item.Desc || "Không có ghi chú."}
                            </div>
                          </div>
                          <div className="d--f ai--c jc--sb">
                            <div
                              className={`text-${
                                !item.ConfirmUserID && !item.ConfirmStatus
                                  ? "warning"
                                  : ""
                              }${
                                item.ConfirmUserID && item.ConfirmStatus === "DUYET"
                                  ? "success"
                                  : ""
                              }${
                                item.ConfirmUserID && item.ConfirmStatus === "TU_CHOI"
                                  ? "danger"
                                  : ""
                              } text-italic fw-500`}
                            >
                              {!item.ConfirmUserID &&
                                !item.ConfirmStatus &&
                                "Đang chờ duyệt"}
                              {item.ConfirmUserID &&
                                item.ConfirmStatus === "DUYET" &&
                                "Đã duyệt"}
                              {item.ConfirmUserID &&
                                item.ConfirmStatus === "TU_CHOI" &&
                                "Từ chối"}
                            </div>
                            <Button
                              className="btn btn-primary btn-xs fw-500 mr-5px"
                              onClick={() => OnOpenSheet(item)}
                            >
                              Chi tiết
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="timeline-item"></div>
              </div>
            </div>
          ) : (
            <div className="h-100 bg-white">
              <PageEmpty Title={"Không có dữ liệu."} />
            </div>
          )}
        </Fragment>
      )}
      <SheetTakeBreak
        SheetOpened={SheetOpened}
        onHide={OnHideSheet}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </Page>
  );
};
export default TakeBreak;
