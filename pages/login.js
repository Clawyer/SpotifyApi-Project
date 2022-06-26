import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import LoginStyle from "../styles/style_component/Login.module.scss";

function Login({ providers }) {
  return (
    <div className={LoginStyle["login--container"]}>
      <header id={LoginStyle.header}>
        <div id={LoginStyle.logo}>
          <Image src={logo} alt="DealyMusic" />
        </div>
        <h1 id={LoginStyle.title}>DealyMusic®</h1>
      </header>
      <main id={LoginStyle.main}>
        <div id={LoginStyle.form}>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                name="login"
                type="submit"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                {`Log in with ${provider.name}`}
              </button>
            </div>
          ))}
        </div>
        <div id={LoginStyle["footer"]}>
          <a href="#">Sign Up</a>
          <br />
          <a href="#">Forgot Password?</a>
        </div>
      </main>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
