import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../Component/Layout";
function logout() {
  const { setval } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/logout", {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        setval(false);
        router.push("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>logout</div>;
}

export default logout;
