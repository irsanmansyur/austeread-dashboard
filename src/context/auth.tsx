import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/commons/api";
import { makeUseAxios, UseAxios } from "axios-hooks";
import { AppInterface } from "@/commons/interface/app";
import Cookies from "js-cookie";
import { COOKIE } from "@/commons/enums/cookie";
import { routes } from "@/commons/enums/route";
import axios from "axios";
import LoginException from "@/commons/exception/login.exception";
// import Loader from "@/components/loader";

export type LoginType = {
  email: string;
  password: string;
  captcha_token: string;
  register_method?: number;
};

type authContextType = {
  api: typeof api;
  user?: AppInterface.User;
  useAxios: UseAxios;
  login: (data: LoginType) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  loadingApi?: boolean;
  configs?: AppInterface.Config;
  categories?: AppInterface.Kategori[];
};

const authContextDefaultValues: authContextType = {
  loading: true,
  api,
  isAuthenticated: false,
  login: async (data) => {},
  logout: () => {},
  useAxios: makeUseAxios({
    axios: api,
  }),
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
  configs?: AppInterface.Config;
  categories?: AppInterface.Kategori[];
};
export const AuthProvider = ({ children, categories, configs }: Props) => {
  const [user, setUser] = useState<AppInterface.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingApi, setLoadingApi] = useState(false);

  useEffect(() => {
    async function loadUserFromCookies() {
      const tokenJwt = Cookies.get(COOKIE.Token) as string | null;
      if (tokenJwt) {
        api.defaults.headers.Authorization = `Bearer ${tokenJwt}`;

        const token = (tokenJwt as string).split(".")[1];
        try {
          const user = JSON.parse(atob(token)) as AppInterface.User;
          setUser({ ...user, token: tokenJwt });
        } catch (error) {
          Cookies.remove(COOKIE.Token);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async ({ email, password, captcha_token, register_method = 1 }: LoginType) => {
    try {
      setLoadingApi(true);
      const {
        data: { data },
        status,
      } = await api.post("auth", { email, password, captcha_token });
      if (status > 300 && !data.data) return;

      if (data.token) {
        console.log("Got token");
        Cookies.set(COOKIE.Token, data.token, {
          expires: 1,
        });

        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        const tokenBase64 = (data.token as string).split(".")[1];
        const userJson = JSON.parse(atob(tokenBase64));
        setUser({ ...userJson, token: data.token });
      }
    } catch (error) {
      setLoadingApi(false);
      if (axios.isAxiosError(error)) {
        const errors = [error.response?.data?.data || error.response?.data?.message || error.message];
        throw new LoginException(errors);
      }
    }
    setLoadingApi(false);
  };

  const logout = () => {
    Cookies.remove(COOKIE.Token);
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = routes.login;
  };

  const useAxios = makeUseAxios({
    axios: api,
  });

  // @ts-ignore
  return <AuthContext.Provider value={{ isAuthenticated: !!user, useAxios, configs, api, categories, user, login, loading, logout, loadingApi }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading || (!isAuthenticated && window.location.pathname !== routes.login)) {
    return <>Loading</>;
  }
  return children;
};

export const NotLoginProtect = ({ children }: any) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <>Loading</>;
  }
  if (isAuthenticated) navigate(routes.dashboard, { replace: true });

  return children;
};
