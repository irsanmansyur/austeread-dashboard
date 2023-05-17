export interface FormProps<TForm = Record<string, any>> {
  data: TForm;
  isDirty: boolean;
  errors: Record<keyof TForm, string>;
  hasErrors: boolean;
  processing: boolean;
  wasSuccessful: boolean;
  recentlySuccessful: boolean;
  setData: setDataByKeyValuePair<TForm>;
  transform: (callback: (data: TForm) => TForm) => void;
  setDefaults(): void;
  setDefaults(field: keyof TForm, value: string): void;
  setDefaults(fields: Record<keyof TForm, string>): void;
  reset: (...fields: (keyof TForm)[]) => void;
  clearErrors: (...fields: (keyof TForm)[]) => void;
  setError(field: keyof TForm, value: string): void;
  setError(errors: Record<keyof TForm, string>): void;
  get: (url: string) => void;
  patch: (url: string) => void;
  post: (url: string) => void;
  put: (url: string) => void;
  delete: (url: string) => void;
}
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void;

export function useForm<TForm = Record<string, any>>(initialValues?: TForm): FormProps<TForm>;
export function useForm<TForm = Record<string, any>>(rememberKey: string, initialValues?: TForm): FormProps<TForm>;
