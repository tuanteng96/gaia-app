import {
  Link,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Toolbar,
} from "framework7-react";
import React from "react";
import PageEmpty from "../../components/Empty/PageEmpty";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import PromHelpers from "../../helpers/PromHelpers";

function NeedHandle({ f7router }) {
  return (
    <Page
      name="need-handle"
      className="bg-white"
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
      ptr
      //ptrMousewheel={true}
      //onPtrRefresh={loadRefresh}
    >
      {/* Top Navbar */}
      <Navbar sliding={false} bgColor="white" innerClass="navbars-bg">
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Cần xử lý</NavTitle>
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
      <PageEmpty Title="Chưa có cần xử lý"/>
    </Page>
  );
}

export default NeedHandle;
