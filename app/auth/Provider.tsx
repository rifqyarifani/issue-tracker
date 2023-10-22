"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const AuthProvder = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvder;
