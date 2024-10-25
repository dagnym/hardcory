"use client";

import { useEffect } from "react";

const AuctionPage = () => {
  useEffect(() => {
    const getAuctions = async () => {
      try {
        const response = await fetch("/api/auctions");
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAuctions();
  });
  return <h2>hi</h2>;
};
export default AuctionPage;
