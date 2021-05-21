import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Styles from "../styles/modal.module.css";

function Users({ data }) {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const handelChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues({ ...values, [name]: value });
  };
  useEffect(() => {
    setvalues({
      name: data.name,
      email: data.email,
      phone: data.phone,
      work: data.work,
    });
  }, []);
  const handelData = async (_id) => {
    const { name, email, phone, work } = values;
    const res = await fetch("/api/hello", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, email, phone, work }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert("success fulll");
      //   setval(true);
      //   router.push("/");
    } else {
      window.alert(data.error);

      // dispatch({ type: "USER", payload: true });
    }
  };
  const handelDelete = async (_id) => {
    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert("success fulll");
      //   setval(true);
      //   router.push("/");
    } else {
      window.alert(data.error);

      // dispatch({ type: "USER", payload: true });
    }
  };

  const statushandel = async (_id, status) => {
    const res = await fetch("/api/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, status }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert("success fulll");
      //   setval(true);
      //   router.push("/");
    } else {
      window.alert(data.error);

      // dispatch({ type: "USER", payload: true });
    }
  };
  return (
    <div className="d-flex ">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <h3>{data.name}</h3>
          </div>
          <div className="col-3">
            <p className="ms-3">{data.email}</p>
          </div>
          <div className="col-1">
            <p className="ms-3">{data.type}</p>
          </div>
          <div className="col-1">
            <p className="ms-3">{data.phone}</p>
          </div>
          <div className="col-1">
            <p className="ms-3">{data.work}</p>
          </div>
          <div
            className="col-1"
            onClick={() => statushandel(data._id, data.status)}
          >
            {data.status ? (
              <p className="ms-3 text-primary">active</p>
            ) : (
              <p className="ms-3 text-secondary">deactive</p>
            )}
          </div>
          {console.log("status", data.status)}
          <div className="col-1">
            <Popup
              trigger={<button className="button"> Open Modal </button>}
              modal
              nested
            >
              {(close) => (
                <div className={Styles.modal}>
                  <button className={Styles.close} onClick={close}>
                    &times;
                  </button>
                  <div className={Styles.header}> Update details </div>

                  <div className={Styles.actions}>
                    <div className="d-flex flex-column">
                      <input
                        onChange={handelChange}
                        value={values.name}
                        name="name"
                        type="text"
                        placeholder="enter name"
                      />
                      <input
                        onChange={handelChange}
                        value={values.email}
                        name="email"
                        type="text"
                        placeholder="enter email"
                      />
                      <input
                        onChange={handelChange}
                        value={values.phone}
                        name="phone"
                        type="number"
                        placeholder="enter phone"
                      />
                      <input
                        onChange={handelChange}
                        value={values.work}
                        name="work"
                        type="text"
                        placeholder="enter work"
                      />
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handelData(data._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setvalues({
                          name: "",
                          email: "",
                          phone: "",
                          work: "",
                        });
                        console.log("modal closed ");
                        close();
                      }}
                    >
                      close modal
                    </button>
                  </div>
                </div>
              )}
            </Popup>
            <button
              className="btn btn-primary"
              onClick={() => handelDelete(data._id)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
