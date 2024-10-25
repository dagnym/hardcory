"use client";

import { useEffect, useState } from "react";

export default function DefiasSearch() {
  const [defiasRealm, setDefiasRealm] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const getRealms = async () => {
      const data = await fetch("/api/find");
      console.log("data: ", data);
      const result = await data.json();
      console.log("result: ", result);
      setDefiasRealm(result);
    };
    getRealms();
  }, []);

  // if (error) return <div>Error: {error}</div>;
  if (!defiasRealm) return <div>Loading...</div>;

  return (
    <div>
      <h1>List of realms</h1>
      <pre>{JSON.stringify(defiasRealm, null, 2)}</pre>
    </div>
  );
}
