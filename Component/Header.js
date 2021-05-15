import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useAppContext } from "./Layout";
import styles from "./Header.module.css";
function Header() {
  const [state, setState] = useState(false);
  const { val } = useAppContext();
  console.log("h1", val);
  const handel = async () => {
    try {
      const Home = await fetch("/api/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await Home.json();
      if (data) {
        setState(true);
      } else {
        setState(false);
      }
    } catch (err) {
      console.log(err);
      setState(false);
    }
  };
  useEffect(() => {
    handel();
  }, []);
  return (
    <div className={styles.main}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link href="/">
            <a>Navbar</a>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  ms-auto mb-2 mb-lg-0">
              {val ? (
                <>
                  <li class="nav-item px-3 ">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li class="nav-item px-3">
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>

                  <li class="nav-item px-3">
                    <Link href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>

                  <li class="nav-item px-3">
                    <Link href="/logout">
                      <a>Logout</a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item px-3">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li class="nav-item px-3">
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>

                  <li class="nav-item px-3">
                    <Link href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>
                  <li class="nav-item px-3">
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li class="nav-item px-3">
                    <Link href="/signup">
                      <a>Registration</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
