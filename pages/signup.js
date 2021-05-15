import React, { useState } from "react";
// import { useHistory } from "react-router";
// import logo from "./undraw_secure_login_pdn4.svg";
import { useRouter } from "next/router";
function Signup() {
  const [Signup, setSignup] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    Cpassword: "",
  });
  const router = useRouter();
  const ChangeHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setSignup({ ...Signup, [name]: value });
  };
  console.log(Signup);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, Cpassword } = Signup;
    const res = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        Cpassword,
      }),
    });
    const data = await res.json();
    if (data.message) {
      window.alert("succesfull");
      router.push("/login");
    } else {
      window.alert(data.error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto mt-5 main_div">
          <div className="row">
            <div className="col-6 ">
              <h2 className="text-center mt-4 mb-5">signup</h2>
              <div className="row">
                <div className="col-8 m-auto">
                  <form method="POST" onSubmit={handelSubmit}>
                    <div className=" mb-3 form-group">
                      <input
                        type="text"
                        name="name"
                        onChange={ChangeHandler}
                        className="form-control input-sm"
                        placeholder="Your Name..."
                        value={Signup.name}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        onChange={ChangeHandler}
                        className="form-control"
                        placeholder="Your Email..."
                        value={Signup.email}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        name="phone"
                        onChange={ChangeHandler}
                        type="number"
                        className="form-control"
                        value={Signup.phone}
                        placeholder="Your Phone number...."
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        name="work"
                        onChange={ChangeHandler}
                        type="text"
                        value={Signup.work}
                        className="form-control"
                        placeholder="Work...."
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        name="password"
                        onChange={ChangeHandler}
                        type="password"
                        value={Signup.password}
                        className="form-control"
                        placeholder="password..."
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        name="Cpassword"
                        onChange={ChangeHandler}
                        value={Signup.Cpassword}
                        type="password"
                        className="form-control"
                        placeholder="confirm password..."
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

export default Signup;
