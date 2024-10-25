"use client";

import { SessionProvider } from "next-auth/react";

const SessionComponent = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionComponent;
