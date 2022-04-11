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
    useStore,
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import LogoImages from "../../assets/media/logos/logo-gaia.png";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";

const Home = ({ f7router }) => {
    return (
        <Page
            name="home"
            className="bg-white page-home"
            noNavbar
            onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR("light")}
            onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}>
            {/* Top Navbar */}
            {/* <Navbar sliding={false} transparent>
                <NavLeft>
                    <Link className="icon-only">
                        <i className="fa-light fa-circle-user"></i>
                    </Link>
                </NavLeft>
                <NavTitle sliding>GAIA</NavTitle>
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
            <div className="">
                <div className="page-home__header px-15px pb-30px">
                    <div className="d--f jc--sb ai--c h-70px">
                        <div className="text-white font-size-lg fw-500 text-uppercase">
                            Hi, Nguyễn Tuấn
                        </div>
                        <div className="w-45px overflow-hidden">
                            <img className="w-100 lazy lazy-fade-in rounded-circle" data-src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="px-15px pb-70px page-home__main bg-white">
                    {
                        Array(5).fill().map((item, index) => (
                            <Link className="mt-15px positon-relative rounded-xl overflow-hidden">
                                <div className="px-8px py-10px positon-absolute bg-white top-15px right-15px text-center rounded-lg">
                                    <div className="font-size-lg fw-600">{index + 12}</div>
                                    <div className="font-size-xs mt-5px">Thg 2</div>
                                </div>
                                <img className="w-100 d-block lazy lazy-fade-in" data-src={`https://layerdrops.com/kipso/assets/images/gallery-1-${index + 1}.jpg`} alt="" />
                                {/* <div className="positon-absolute bottom-15px left-15px w-p15px rounded-xl p-15px bz-bb">
                                    <div>How to group your Facebook Page</div>
                                    <div>Follow these easy and simple steps</div>
                                </div> */}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Page>
    );
};
export default Home;
