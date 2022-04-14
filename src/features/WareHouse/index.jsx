import React, { useState, useEffect, Fragment } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  useStore,
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import WareHouseApi from "../../api/WareHouseApi";
import PageEmpty from "../../components/Empty/PageEmpty";

function WareHouse({ f7router }) {
  const { User } = useStore("Auth");

  const [ListWareHouse, setListWareHouse] = useState([]);
  const [PageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Filters, setFilters] = useState({
    _key: "",
    _teacherid: User.ID,
    _pi: 1,
    _ps: 10,
  });

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
        const { list, total } = data;
        setListWareHouse((prevState) => [...prevState, ...list]);
        setPageTotal(total);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  console.log(ListWareHouse);

  return (
    <Page
      name="warehouse"
      className="bg-white"
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
    >
      {/* Top Navbar */}
      <Navbar sliding={false} bgColor="white" innerClass="navbars-bg">
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Kho</NavTitle>
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
      {loading && "Đang tải"}
      {!loading && (
        <Fragment>
          {ListWareHouse && ListWareHouse.length > 0 ? (
            <div className="position-relative">
              {ListWareHouse.map((item, index) => (
                <div className="border-bottom p-15px" key={index}>
                  {item.Title}
                </div>
              ))}
            </div>
          ) : (
            <PageEmpty Title="Không cứ dữ liệu." />
          )}
        </Fragment>
      )}
    </Page>
  );
}

export default WareHouse;
