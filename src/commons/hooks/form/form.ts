import { useAuth } from "@/context/auth";
import { useState } from "react";

export function useForm(initValue: Record<string, any> = {}) {
  const { api } = useAuth();
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState();
  const [data, setDataDefault] = useState<Record<string, any>>({});
  const [loading, setloading] = useState(false);

  const setData = (key: string, value: string) => {
    setDataDefault({ ...data, [key]: value });
  };
  const post = (url: string) => {
    setloading(true);
    api
      .get(url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setloading(false);
      });
  };
  const get = (url: string) => {
    setloading(true);
    api
      .get(url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  // custom hook returns value
  return { response, errors, get, loading, data, setData };
}
