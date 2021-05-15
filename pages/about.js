import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../Component/Layout";
function About() {
  const { setval } = useAppContext();
  const [mainData, setmainData] = useState();
  const router = useRouter();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setmainData(data);
      setval(true);

      if (!res.status === 200) {
        const error = new Error("invaldated..........");
        throw error;
      }
    } catch (err) {
      console.log(err);
      router.push("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  // console.log(mainData);
  return (
    <div>
      <form method="GET">
        <div className="form-group ">
          <label>name:-{mainData?.name}</label>
          <p>work:-{mainData?.work}</p>
          <p>email:-{mainData?.email}</p>
          <p>phone:-{mainData?.phone}</p>
        </div>
      </form>
    </div>
  );
}

export default About;
