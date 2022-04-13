import React, { useEffect, useState, useRef } from "react";
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    SkeletonBlock,
    SkeletonImage
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import LogoImages from "../../assets/media/logos/logo-gaia-text.png";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import PostsApi from "../../api/postsApi";
import ItemPosts from "./components/ItemPosts";

const Home = ({ f7router }) => {
    const [loading, setLoading] = useState(false);
    const [ListPosts, setListPosts] = useState([]);
    const [PageTotal, setPageTotal] = useState(0);
    const [filters, setFilters] = useState({
        ID: 10080,
        Pi: 1,
        Ps: 3,
    });
    const [showPreloader, setShowPreloader] = useState(false);
    const allowInfinite = useRef(true);

    useEffect(() => {
        getListNew();
    }, []);

    const getListNew = (isLoading = true, callback) => {
        isLoading && setLoading(true);
        PostsApi.getPostsToId(filters)
            .then(({ data }) => {
                setLoading(false);
                setListPosts(data.data);
                setPageTotal(data.more.total);
                callback && callback();
            })
            .catch((error) => console.log(error));
    };

    const loadRefresh = (done) => {
        getListNew(false, () => {
            setTimeout(() => {
                done();
            }, 300);
        });
    };

    const loadMore = () => {
        if (!allowInfinite.current) return;
        allowInfinite.current = false;

        if (ListPosts.length >= PageTotal) {
            setShowPreloader(false);
            return;
        }
        setShowPreloader(true);
        const newFilters = { ...filters, Pi: filters.Pi + 1 };
        PostsApi.getPostsToId(newFilters)
            .then(({ data }) => {
                setListPosts((prevState) => [...prevState, ...data.data]);
                setPageTotal(data.more.total);
                allowInfinite.current = true;
            })
            .catch((error) => console.log(error));
    };

    return (
      <Page
        name="home"
        className="bg-white page-home"
        //noNavbar
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
        <Navbar className="bg-color-white border-bottom" sliding={false}>
          <NavLeft>
            <Link className="icon-only">
              <div className="font-size-h6 fw-500">
                <i className="fa-regular fa-bars-sort"></i>
              </div>
            </Link>
          </NavLeft>
          <NavTitle className="w-65px">
            <div className="h-100 d--f ai--c jc--c">
              <img className="w-100" src={LogoImages} alt="" />
            </div>
          </NavTitle>
          <NavRight>
            <Link className="icon-only">
              <div className="text-center">
                <i className="font-size-h6 fa-regular fa-bell"></i>
              </div>
            </Link>
          </NavRight>
        </Navbar>
        {/* Toolbar */}
        <Toolbar bottom className="bg-white">
          <ToolbarControls f7router={f7router} />
        </Toolbar>
        {/* Page content */}
        <div className="">
          <div className="p-15px page-home__main bg-white">
            {loading && (
              <div>
                <SkeletonImage
                  className="w-100 h-200px shadows rounded-sm skeleton-text skeleton-effect-wave"
                  slot="media"
                />
                <SkeletonBlock
                  className="w-100 mt-10px h-15px skeleton-text skeleton-effect-wave"
                  slot="media"
                />
                <SkeletonBlock
                  className="w-100 mt-10px h-8px skeleton-text skeleton-effect-wave"
                  slot="media"
                />
                <SkeletonBlock
                  className="w-100 mt-5px h-8px skeleton-text skeleton-effect-wave"
                  slot="media"
                />
              </div>
            )}
            {!loading &&
              ListPosts &&
              ListPosts.map((item, index) => (
                <ItemPosts key={index} item={item} />
              ))}
          </div>
        </div>
      </Page>
    );
};
export default Home;
