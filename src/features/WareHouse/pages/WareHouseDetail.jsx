import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Link,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Toolbar,
  useStore,
} from "framework7-react";
import ToolbarControls from "../../../components/Toolbar/ToolbarControls";
import WareHouseApi from "../../../api/WareHouseApi";
import PageEmpty from "../../../components/Empty/PageEmpty";
import ItemWareHouseDetail from "../components/ItemWareHouseDetail";
import SkeletonDetailPage from "../SkeletonDetailPage";

function WareHouseDetail({ f7router, f7route }) {
  const { User } = useStore("Auth");
  const { params, query } = f7route;
  const [ListDetailWareHouse, setListDetailWareHouse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [PageTotal, setPageTotal] = useState(0);
  const [Filters, setFilters] = useState({
    _key: "",
    _teacherid: User.ID,
    _itemid: params.ID,
    _pi: 1,
    _ps: 10,
  });
  const [showPreloader, setShowPreloader] = useState(false);

  const allowInfinite = useRef(true);

  useEffect(() => {
    getDetailWareHouse();
  }, []);

  const getDetailWareHouse = (
    obj = {
      isLoading: true,
      Filters: Filters,
      refresh: false,
    },
    callback
  ) => {
    const { isLoading, Filters, refresh } = obj;
    isLoading && setLoading(true);
    WareHouseApi.getDetail(Filters)
      .then(({ data }) => {
        const { list, total, pi } = data;
        setFilters({ ...Filters, Pi: pi });
        if (refresh) {
          setListDetailWareHouse(() => [...list]);
        } else {
          setListDetailWareHouse((prevState) => [...prevState, ...list]);
        }
        setPageTotal(total);
        setLoading(false);
        callback && callback();
      })
      .catch((error) => console.log(error));
  };

  const loadRefresh = (done) => {
    getDetailWareHouse(
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
    if (ListDetailWareHouse.length >= PageTotal) {
      setShowPreloader(false);
      return;
    }
    setShowPreloader(true);
    const newFilters = { ...Filters, Pi: Filters.Pi + 1 };
    getDetailWareHouse(
      { isLoading: false, Filters: newFilters, refresh: false },
      () => {
        allowInfinite.current = true;
      }
    );
  };

  return (
    <Page
      name="warehouse-detail"
      className="bg-white"
      ptr
      //ptrMousewheel={true}
      onPtrRefresh={loadRefresh}
      infinite
      infiniteDistance={50}
      infinitePreloader={showPreloader}
      onInfinite={loadMore}
    >
      <Navbar sliding={false} bgColor="white" innerClass="navbars-bg">
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>{query.Title}</NavTitle>
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
      {loading && <SkeletonDetailPage />}
      {!loading && (
        <Fragment>
          {ListDetailWareHouse && ListDetailWareHouse.length > 0 ? (
            <div className="p-15px">
              {ListDetailWareHouse.map((item, index) => (
                <ItemWareHouseDetail key={index} item={item} />
              ))}
            </div>
          ) : (
            <PageEmpty />
          )}
        </Fragment>
      )}
    </Page>
  );
}

export default WareHouseDetail;
