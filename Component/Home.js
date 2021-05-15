import React, { useEffect, useState } from "react";
import { useAppContext } from "./Layout";

function Home() {
  const { setval } = useAppContext();
  const [userData, setuserData] = useState();
  const homeData = async () => {
    try {
      const Home = await fetch("/api/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await Home.json();
      setuserData(data);
      setval(true);
    } catch (err) {
      console.log(err);
      setuserData();
    }
  };
  useEffect(() => {
    homeData();
  }, []);
  return (
    <div className="text-center mt-5  pt-5">
      <form method="GET">
        {!userData ? (
          <div>
            <p>Welcome</p>
            <h1>we are developer</h1>
          </div>
        ) : (
          <div>
            <p>{userData.name}</p>
            <h1>I am {userData.work}</h1>
          </div>
        )}
      </form>
    </div>
  );
}

export default Home;
