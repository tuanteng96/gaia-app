import React, { useEffect, useState } from "react";
import {
  Page,
  Toolbar,
  Link
} from "framework7-react";
import PromHelpers from "../../helpers/PromHelpers";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import PostsApi from "../../api/postsApi";
import { toAbsoluteUrl } from "../../helpers/AssetsHelpers";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");


const PostsDetail = ({ f7router, f7route }) => {
  const { ID } = f7route.params;
  const [PostDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (ID) {
      getDetailPosts();
    }
  }, []);

  const getDetailPosts = () => {
    setLoading(true);
    PostsApi.getPostsDetailToId(ID).then(({ data }) => {
      setPostDetail(data.data[0]);
      setLoading(false);
    }).catch((error) => console.log(error));
  }

  return (
    <Page
      className="bg-white page-posts-detail"
      name="detailPost"
      noNavbar
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR("light")}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}>
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router} />
      </Toolbar>
      {/* Page content */}
      {
        loading && "Đang tải"
      }
      {!loading && PostDetail && (
        <div className="position-relative">
          <div className="position-absolute top-0 left-15px p-safe-area-top">
            <Link className="w-45px h-45px bg-success-ezs d--f ai--c jc--c shadow rounded-circle mt-15px" onClick={() => f7router.back()}>
              <i className="text-white font-size-lg fa-light fa-arrow-left"></i>
            </Link>
          </div>
          <div className="shadow">
            <img className="w-100" src={toAbsoluteUrl(PostDetail.Thumbnail)} alt={PostDetail.Title} />
          </div>
          <div className="p-15px">
            <div className="font-size-h5 line-height-xl fw-600">
              {PostDetail.Title}
            </div>
            <div className="font-size-sm line-height-lg mb-10px text-gray-600 text-capitalize">{moment(PostDetail.CreateDate).format('LLLL')}</div>
            <div className="font-size-md line-height-lg text-gray-800" dangerouslySetInnerHTML={{ __html: PostDetail.Desc }} />
            <div dangerouslySetInnerHTML={{ __html: PostDetail.Content }} />
          </div>
        </div>
      )}

    </Page>
  );
};
export default PostsDetail;
