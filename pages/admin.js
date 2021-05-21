import React, { useEffect, useState } from "react";
import { useAppContext } from "../Component/Layout";
import Users from "../Component/Users";
import { useRouter } from "next/router";
import { server } from "../config/index";
import useSWR from "swr";
function Admin() {
  const { setval } = useAppContext();
  const [userData, setuserData] = useState();
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  // const fet = () => {
  const { data, error } = useSWR("/api/data", fetcher);
  if (error) return error;
  if (!data) return <h1>loading....</h1>;

  // if (data) {
  //   setuserData(data);
  // }
  // };

  // const callAboutPage = async () => {
  //   try {
  //     const res = await fetch("/api/about", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //     if (data.email === "nitutak70@gmail.com") {
  //       fet();
  //     } else {
  //       console.log("err");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     router.push("/");
  //   }
  // };

  // useEffect(() => {
  //   callAboutPage();
  // }, []);
  return (
    <div className="text-center mt-5  pt-5">
      {data?.map((res) => (
        <Users data={res} />
      ))}
    </div>
  );
}
// export async function getServerSideProps(context) {
//   const res = await fetch(`http://localhost:3000/api/about`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();

//   if (!data) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }

export default Admin;
