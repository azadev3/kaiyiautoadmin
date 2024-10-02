import React from "react";
import { useRecoilValue } from "recoil";
import { IsAuthState } from "./recoil/atoms";
import { Navigate } from "react-router-dom";

type props = {
  children: any;
};

const ProtectedRoute: React.FC<props> = ({ children }) => {
  const isAuth = useRecoilValue(IsAuthState);

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
