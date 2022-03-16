import React from "react";
import FormLogin from "../Component/FormLogin/FormLogin";
import style from "./Login.module.scss";

export default function LoginPage() {
  return (
    <div className={style.root}>
      <div className={style.content}>
        <div className={style.image_company}></div>
        <div className={style.logo_title}>Login</div>
        <FormLogin />
      </div>
    </div>
  );
}
