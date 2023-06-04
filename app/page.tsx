"use client";

import styles from "@/app/styles/login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Popup from "@/app/components/UI/popup";
import request from "./utils/request";
import ButtonContainer from "./components/UI/buttonContainer";
import { useCookies } from "react-cookie";
import TextInput from "./components/UI/textInput";
import ImportantButton from "./components/UI/buttons/button";
import ErrorMessage from "./components/UI/messages/errorMessage";

const Home = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [menu, setMenu] = useState<null | React.ReactNode>(null);
  const [loading, setLoading] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setMenu(null);
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
        <div className="my-5">
          <ErrorMessage>
            <p>{res.message}</p>
          </ErrorMessage>
        </div>
      );
  };

  useEffect(() => {
    const token = cookies[0].token;
    if (!token) return;
    setLoading(true);
    request("/check_auth_token", { token }).then((res) => {
      setLoading(false);
      if (res.status === "success") router.push("/dashboard");
    });
  }, [cookies]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <form className={styles.form} onSubmit={login}>
          <center>
            <strong>
              <h1>Sign in</h1>
            </strong>
          </center>
          {menu}
          <TextInput id="username" placeholder="Username" />
          <TextInput id="password" type="password" placeholder="Password" />
          <ButtonContainer loading={loading}>
            <ImportantButton>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              <strong>Login</strong>
            </ImportantButton>
          </ButtonContainer>
        </form>
      </div>
    </>
  );
};

export default Home;
