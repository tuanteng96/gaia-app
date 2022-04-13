import { View, f7, Link } from "framework7-react";
import React, { useEffect } from "react";

function Layout({ f7router }) {
  useEffect(() => {
    f7router.navigate("/home/", { transition: "f7-circle" });
  }, []);

  return (
    <div></div>
  );
}

export default Layout;
