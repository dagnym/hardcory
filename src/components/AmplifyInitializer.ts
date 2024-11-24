"use client";

import { Amplify } from "aws-amplify";
import React from "react";

import config from "~/amplify_outputs.json";

Amplify.configure(config);

const AmplifyInitializer = ({ children }: { children: React.ReactNode }) =>
  children;

export default AmplifyInitializer;
