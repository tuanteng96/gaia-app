import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  useStore,
  Subnavbar,
  ListInput,
  List,
  Searchbar,
  theme,
  Input,
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import WareHouseApi from "../../api/WareHouseApi";
import PageEmpty from "../../components/Empty/PageEmpty";
import SkeletonPage from "./SkeletonPage";

function WareHouse({ f7router }) {
  const { User } = useStore("Auth");

  const [ListWareHouse, setListWareHouse] = useState([]);
  const [PageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Filters, setFilters] = useState({
    _key: "",
    _teacherid: User.ID,
    _pi: 1,
    _ps: 5,
  });
  const [showPreloader, setShowPreloader] = useState(false);
  const allowInfinite = useRef(true);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    getListWareHouse();
  }, []);

  const getListWareHouse = (
    obj = {
      isLoading: true,
      Filters: Filters,
      refresh: false,
    },
    callback
  ) => {
    const { isLoading, Filters, refresh } = obj;
    isLoading && setLoading(true);
    WareHouseApi.getList(Filters)
      .then(({ data }) => {
        const { list, total, pi } = data;
        setFilters({ ...Filters, Pi: pi });
        if (refresh) {
          setListWareHouse(() => [...list]);
        }
        else {
          setListWareHouse((prevState) => [...prevState, ...list]);
        }
        setPageTotal(total);
        setLoading(false);
        callback && callback();
      })
      .catch((error) => console.log(error));
  };

  const loadRefresh = (done) => {
    getListWareHouse({
      isLoading: false,
      Filters: { ...Filters, Pi: 1 },
      refresh: true,
    }, () => {
      setTimeout(() => {
        allowInfinite.current = true;
        done();
      }, 300);
    });
  }

  const loadMore = () => {
    if (!allowInfinite.current) return;
    allowInfinite.current = false;
    if (ListWareHouse.length >= PageTotal) {
      setShowPreloader(false);
      return;
    }
    setShowPreloader(true);
    const newFilters = { ...Filters, Pi: Filters.Pi + 1 };
    getListWareHouse(
      { isLoading: false, Filters: newFilters, refresh: false },
      () => {
        allowInfinite.current = true;
      }
    );
  }

  const handleChangeSearch = (values) => {
    setLoading(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      getListWareHouse(
        { isLoading: false, Filters: { ...Filters, Pi: 1, _key: values }, refresh: true },
        () => {
          allowInfinite.current = true;
        }
      );
    }, 500);
  }

  return (
    <Page
      name="warehouse"
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
        <NavTitle sliding={true}>Kho của bạn</NavTitle>
        <NavRight>
          <Link href="/notification/" className="icon-only">
            <div className="text-center position-relative line-height-sm">
              <i className="font-size-h6 fa-regular fa-bell"></i>
              <div className="position-absolute w-6px h-6px border border-white rounded-circle bg-success shadow top-0 right-0"></div>
            </div>
          </Link>
        </NavRight>
        <Subnavbar inner={false}>
          <div className="w-100 h-100">
            <Input
              className="w-100 h-100 input-border-none px-20px bz-bb"
              type="text"
              clearButton
              validate
              placeholder="Tên giáo cụ ..."
              onChange={e => handleChangeSearch(e.target.value)}
              onInputClear={() => handleChangeSearch("")}
            />
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
          {ListWareHouse && ListWareHouse.length > 0 ? (
            <div className="position-relative mt-15px">
              {ListWareHouse.map((item, index) => (
                <Link className="d--f ai--c p-15px border-bottom" key={index}>
                  <div className="symbol symbol-light-primary">
                    <div className="icon w-50px h-50px symbol-label rounded-circle d--f ai--c jc--c font-size-xs fw-600">
                      {item.InQty / item.OutQty * 100}%
                    </div>
                  </div>
                  <div className="f--1 pl-20px max-w-70">
                    <div className="font-size-md fw-500 line-height-sm mb-4px text-truncate">
                      {item.Title}
                    </div>
                    <div className="line-height-sm">
                      <span className="pr-2px">Đã dùng {item.InQty}</span>/<span className="pl-2px">Tổng {item.OutQty}</span>
                    </div>
                  </div>
                  <div className="w-20px text-center">
                    <i className="font-size-lg text-gray-400 fa-light fa-chevron-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <PageEmpty Title="Không có dữ liệu." />
          )}
        </Fragment>
      )}
    </Page>
  );
}

export default WareHouse;
