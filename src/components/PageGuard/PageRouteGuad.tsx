import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { tokenImport } from "../../vite-env";
import { isLoggedIn } from "../input/Auth";

interface pageRouteGuad {
  children: React.ReactNode;
  role: tokenImport | null;
}

const PageRouteGuad = ({ children}: pageRouteGuad): React.ReactNode => {
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // You can navigate here
      navigate("/channel");
    } else {
      // You can navigate here
      navigate("/noauth");
    }
  }, []); // Add role as a dependency to re-run the effect when it changes

  return <>{children}</>;
};

export default PageRouteGuad;
