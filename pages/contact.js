import { useState, useEffect } from "react";
import styles from "../styles/Contact.module.css";
import { server } from "../config";
import { useAppContext } from "../Component/Layout";
function contact({ data }) {
  const { setval } = useAppContext();
  const [mainData, setmainData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  console.log(data);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setmainData({ ...mainData, [name]: value });
  };
  const userContact = async () => {
    try {
      const res = await fetch("api/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      console.log(data);
      setmainData({
        ...mainData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      setval(true);

      if (!res.status === 200) {
        const error = new Error("invaldated..........");
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userContact();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = mainData;
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("message");
    } else {
      alert("message send");
      setmainData({ ...mainData, message: "" });
    }
  };
  return (
    <div className="styles.main_block">
      <div className="container">
        <div className="main__up">
          <div className="row">
            <div className="col-4 ">
              <div className={styles.box}>
                <h3>Phone</h3>
                <p>7727993650</p>
              </div>
            </div>
            <div className="col-4 ">
              <div className={styles.box}>
                <h3>Email</h3>
                <p>devanshsingh7727@gmail.com</p>
              </div>
            </div>

            <div className="col-4 ">
              <div className={styles.box}>
                <h3>Address</h3>
                <p>kota,rajasthan,india</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main__down mt-5 shadow rounded">
          <h2 className="text-center py-5">Get In Touch</h2>
          <div className="main__down__div px-5">
            <form method="POST" onSubmit={handelSubmit}>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    name="name"
                    value={mainData.name}
                    class="form-control"
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </div>
                <div class="col">
                  <input
                    name="email"
                    type="text"
                    value={mainData.email}
                    class="form-control"
                    onChange={handleChange}
                    placeholder="Your Email"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    name="phone"
                    value={mainData.phone}
                    class="form-control"
                    onChange={handleChange}
                    placeholder="Your PhoneNumber"
                  />
                </div>
              </div>
              <div className="row px-3 mt-5 pb-5">
                <textarea
                  rows="5"
                  name="message"
                  onChange={handleChange}
                  value={mainData.message}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default contact;
