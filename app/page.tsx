"use client";

import Background from "@/app/components/UI/background";
import styles from "@/app/styles/login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Popup from "@/app/components/UI/popup";
import request from "./utils/request";
import ButtonContainer from "./components/UI/buttonContainer";
import { useCookies } from "react-cookie";

const Home = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [menu, setMenu] = useState<null | React.ReactNode>(null);
  const [loading, setLoading] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    const res = await request("/login", {
      username,
      password,
    });
    setLoading(false);
    if (res.status === "success") {
      cookies[1]("token", res.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 25, // 25 days
      });
      router.push("/dashboard");
    } else
      setMenu(
        <Popup title="Error" type="error" setMenu={setMenu}>
          <p>{res.message}</p>
        </Popup>
      );
  };

  useEffect(() => {
    const token = cookies[0].token;
    if (!token) return;
    request("/check_auth_token", { token }).then((res) => {
      if (res.status === "success") router.push("/dashboard");
    });
  }, [cookies]);

  return (
    <>
      <Background />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <form className={styles.form} onSubmit={login}>
          <h2 className="text-light">Sign in</h2>
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username</label>
            <input
              className="input glass"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              className="input glass"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <ButtonContainer loading={loading}>
            <button className="button flex" type="submit">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              Login
            </button>
          </ButtonContainer>
        </form>
      </div>
      {menu}
    </>
  );
};

export default Home;
