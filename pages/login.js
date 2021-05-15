import React, { useContext, useState } from "react";
// import logo from "./undraw_Login_re_4vu2.svg";
// import { useHistory } from "react-router";
// import "./Login.css";
// import { userContext } from "../App";
import { useRouter } from "next/router";
import { useAppContext } from "../Component/Layout";
function Login() {
  const { setval } = useAppContext();
  // const { state, dispatch } = useContext(userContext);
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const ChangeHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setLogin({ ...Login, [name]: value });
  };
  console.log(Login);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = Login;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert("success fulll");
      setval(true);
      router.push("/");
    } else {
      window.alert(data.error);

      // dispatch({ type: "USER", payload: true });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto mt-5 main_div">
          <div className="row">
            <div className="col-6 ">
              <h2 className="text-center mt-4 mb-5">Login</h2>
              <div className="row">
                <div className="col-8 m-auto">
                  <form method="POST" onSubmit={handelSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        onChange={ChangeHandler}
                        className="form-control"
                        placeholder="Your Email..."
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        name="password"
                        onChange={ChangeHandler}
                        type="password"
                        className="form-control"
                        placeholder="password..."
                      />
                    </div>

                    <button type="submit" className="btn btn-primary my-4">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-6 m-auto">
              {/* <img className="img" src={logo} alt="asd" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
