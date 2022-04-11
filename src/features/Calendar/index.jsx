import React from "react";
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
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";

const Calendar = ({f7router}) => {
  return (
    <Page name="calendar" 
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}>
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavLeft>
          <Link className="icon-only">
            <i className="fa-light fa-circle-user"></i>
          </Link>
        </NavLeft>
        <NavTitle sliding>Bảng lịch</NavTitle>
        <NavRight>
          <Link className="icon-only">
            <i className="fa-light fa-bell"></i>
          </Link>
        </NavRight>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router}/>
      </Toolbar>
      {/* Page content */}
      <Block strong>
        <p>Here is your blank Framework7 app. Let's see what we have here.</p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem link="/about/" title="About" />
        <ListItem link="/form/" title="Form" />
      </List>
      <button
        type="button"
      >
        Push Action
      </button>
      <BlockTitle>Modals</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50">
            <Button fill raised popupOpen="#my-popup">
              Popup
            </Button>
          </Col>
          <Col width="50">
            <Button fill raised loginScreenOpen="#my-login-screen">
              Login Screen
            </Button>
          </Col>
        </Row>
      </Block>

      <BlockTitle>Panels</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50">
            <Button fill raised panelOpen="left">
              Left Panel
            </Button>
          </Col>
          <Col width="50">
            <Button fill raised panelOpen="right">
              Right Panel
            </Button>
          </Col>
        </Row>
      </Block>

      <List>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
    </Page>
  );
};
export default Calendar;
