"use client";
import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
interface SessionComponentProps {
  children: ReactNode;
}

const SessionComponent = ({ children }: SessionComponentProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionComponent;
