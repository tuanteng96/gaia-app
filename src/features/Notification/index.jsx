import {
  f7,
  Link,
  List,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  SkeletonBlock,
  SkeletonText,
  Toolbar,
  useStore,
} from "framework7-react";
import React, { useState, useEffect, useRef, Fragment } from "react";
import NotificationApi from "../../api/NotificationApi";
import { ArrayHelper } from "../../helpers/ArrayHelper";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import ItemNotification from "./components/ItemNotification";

import moment from "moment";
import "moment/dist/locale/vi";
import SkeletonPage from "./SkeletonPage";
import NotificationEmpty from "../../components/Empty/NotificationEmpty";
moment.locale("vi");

function Notification({ f7router }) {
  const [ListNotification, setListNotification] = useState([]);
  const [ListTotal, setListTotal] = useState(0);
  const [Filters, setFilters] = useState({
    Ps: 10,
    Pi: 1,
  });
  const [PageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const allowInfinite = useRef(true);
  const { User } = useStore("Auth");

  useEffect(() => {
    getListNotification();
  }, []);

  const getListNotification = (
    obj = {
      isLoading: true,
      Filters: Filters,
      refresh: false,
    },
    callback
  ) => {
    const { isLoading, Filters, refresh } = obj;
    isLoading && setLoading(true);
    NotificationApi.getList({
      Pi: Filters.Pi,
      Ps: Filters.Ps,
      UserID: User.ID,
      acc_type: User.acc_type,
    })
      .then(({ data }) => {
        setLoading(false);
        setFilters({ ...Filters, Pi: data.more.pi });
        if (refresh) {
          setListTotal(data.data.length);
          setListNotification(
            ArrayHelper.GroupByDate({
              Key: "CreateDate",
              ArrayMap: data.data,
              StrSplit: "T",
            })
          );
        } else {
          const NewListNotification = [
            ...ArrayHelper.ReverseGroupByDate(ListNotification),
            ...data.data,
          ];

          setListTotal(NewListNotification.length);
          setListNotification([
            ...ArrayHelper.GroupByDate({
              Key: "CreateDate",
              ArrayMap: NewListNotification,
              StrSplit: "T",
            }),
          ]);
        }
        setPageTotal(data.more.total);
        callback && callback();
      })
      .catch((error) => console.log(error));
  };

  const loadRefresh = (done) => {
    getListNotification(
      {
        isLoading: false,
        Filters: { ...Filters, Pi: 1 },
        refresh: true,
      },
      () => {
        setTimeout(() => {
          allowInfinite.current = true;
          done();
        }, 300);
      }
    );
  };

  const loadMore = () => {
    if (!allowInfinite.current) return;
    allowInfinite.current = false;
    if (ListTotal >= PageTotal) {
      setShowPreloader(false);
      return;
    }
    setShowPreloader(true);
    const newFilters = { ...Filters, Pi: Filters.Pi + 1 };
    getListNotification(
      { isLoading: false, Filters: newFilters, refresh: false },
      () => {
        allowInfinite.current = true;
      }
    );
  };

  const onClearNotification = () => {
    f7.dialog.confirm("Bạn muốn xóa tất cả thông báo ?", () => {
      f7.dialog.preloader("Đang thực hiện ...");
      const dataPost = new FormData();
      dataPost.append("acctype", User.acc_type);
      dataPost.append("accid", User.ID);
      NotificationApi.clearList(dataPost)
        .then((response) => {
          getListNotification(
            {
              isLoading: true,
              Filters: { ...Filters, Pi: 1 },
              refresh: true,
            },
            () => {
              f7.dialog.close();
            }
          );
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <Page
      className="bg-white"
      name="page-notification"
      //noToolbar
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
      <Navbar
        innerClass="navbars-bg"
        //title="What is your email address?"
        //noShadow={true}
        sliding={false}
        noHairline={true}
        bgColor="white"
      >
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Thông báo</NavTitle>
        <NavRight>
          {ListNotification && ListNotification.length > 0 && (
            <Link className="icon-only" onClick={onClearNotification}>
              <div className="text-center">
                <i className="font-size-h6 fa-light fa-trash-can text-danger"></i>
              </div>
            </Link>
          )}
        </NavRight>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router} />
      </Toolbar>
      {/* Page content */}
      {loading && <SkeletonPage />}
      {!loading && (
        <Fragment>
          {ListNotification && ListNotification.length > 0 ? (
            ListNotification.map((item, index) => (
              <div className="p-15px" key={index}>
                <div className="fw-600 text-gray-600 mb-20px">
                  {moment(item.day).format("ll")}
                </div>
                <div>
                  {item.items.map((o, idx) => (
                    <ItemNotification key={idx} item={o} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <NotificationEmpty Title="Không có thông báo mới" />
          )}
        </Fragment>
      )}
    </Page>
  );
}

export default Notification;
