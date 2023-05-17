import ButtonCustom from "@/components/form/button";
import { InputCustom } from "@/components/form/InputGroup";
import HelmetLayout from "@/layouts/HelmetLayout";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useAuth } from "@/context/auth";
import LoginException from "@/commons/exception/login.exception";
import AlertDanger from "@/components/alert/danger";
import { routes } from "@/commons/enums/routes";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | undefined>();
  const [data, setData] = useState<{ register_method?: number; email?: string; password?: string }>();
  const captchaRef = useRef(null);
  const { login, loadingApi } = useAuth();
  const loginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // @ts-ignore
    const token = captchaRef?.current?.getValue() as string;
    if (!token) return setMessage("Error! You must confirm you are not a robot");

    try {
      await login({ email: `${data?.email}`, captcha_token: token, password: `${data?.password}` });
      setMessage(undefined);
      navigate(routes.dashboard, { replace: true });
    } catch (error) {
      if (error instanceof LoginException) {
        setMessage(error.errors.join(","));
        return;
      }
      console.log("error", error);
    }
  };

  return (
    <HelmetLayout title="Login">
      <form
        onSubmit={loginForm}
        className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4"
      >
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-primary to-primary-light text-white shadow-blue-500/40 shadow-lg -mt-6 mb-4 grid h-28 place-items-center">
          <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">Sign In</h3>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {message && <AlertDanger desc={message} message="Login Error" />}
          <InputCustom label="Email" onChange={(e) => setData({ ...data, email: e.target.value })} name="email" autoComplete="username" type="email" />
          <InputCustom type="password" name="password" onChange={(e) => setData({ ...data, password: e.target.value })} autoComplete="current-password" label="Password" />
          <div>
            <ReCAPTCHA
              onChange={(e) => {
                console.log(e);
              }}
              ref={captchaRef}
              sitekey={process.env.REACT_APP_SITE_KEY ?? ""}
            />
          </div>
          <div className="-ml-2.5">
            <div className="inline-flex items-center">
              <label className="relative flex items-center cursor-pointer p-3 rounded-full" htmlFor="checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-blue-500 checked:border-blue-500 checked:before:bg-blue-500"
                  id="checkbox"
                />
                <div className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </label>
              <label className="text-gray-700 font-light select-none cursor-pointer mt-px" htmlFor="checkbox">
                Remember Me
              </label>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <ButtonCustom disabled={loadingApi} className="w-full">
            Login
          </ButtonCustom>
          <p className="antialiased font-sans text-sm font-light leading-normal text-inherit mt-6 flex justify-center">
            Don't have an account?
            <Link to={"/register"}>
              <span className="block antialiased font-sans text-sm leading-normal text-primary ml-1 font-bold">Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </HelmetLayout>
  );
}

export const redirectIfUser = ({ request }: any) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return { searchTerm };
};
