import React, { useEffect, useRef } from "react";
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
  ListInput,
  f7,
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";

const Calendar = ({ f7router }) => {
  const calendarInline = useRef(null);
  const onPageInit = () => {
    const $ = f7.$;
    // Inline with custom toolbar
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    calendarInline.current = f7.calendar.create({
      containerEl: "#demo-calendar-inline-container",
      value: [new Date()],
      renderToolbar() {
        return `
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="left">
                <a href="#" class="link icon-only"><i class="icon icon-back"></i></a>
              </div>
              <div class="center"></div>
              <div class="right">
                <a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>
              </div>
            </div>
          </div>
        `.trim();
      },
      on: {
        init(c) {
          $(".calendar-custom-toolbar .center").text(
            `${monthNames[c.currentMonth]}, ${c.currentYear}`
          );
          $(".calendar-custom-toolbar .left .link").on("click", () => {
            calendarInline.current.prevMonth();
          });
          $(".calendar-custom-toolbar .right .link").on("click", () => {
            calendarInline.current.nextMonth();
          });
        },
        monthYearChangeStart(c) {
          $(".calendar-custom-toolbar .center").text(
            `${monthNames[c.currentMonth]}, ${c.currentYear}`
          );
        },
        dayClick({ value }) {
          console.log(value[0]);
        },
      },
    });
  };
  const onPageBeforeRemove = () => {
    calendarInline.current.destroy();
  };

  return (
    <Page
      name="calendar"
      noNavbar
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageInit={onPageInit}
      onPageBeforeRemove={onPageBeforeRemove}
    >
      {/* Top Navbar */}
      {/* <Navbar sliding={false}>
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
      </Navbar> */}
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router} />
      </Toolbar>
      {/* Page content */}
      <div id="demo-calendar-inline-container" />
    </Page>
  );
};
export default Calendar;
