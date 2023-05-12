import { AppInterface } from "@/commons/interface/app";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { InputCustom } from "../form/InputGroup";
import { VscChromeClose } from "react-icons/vsc";
import ButtonCustom from "../form/button";
import { useAuth } from "@/context/auth";
type Props = { user: AppInterface.User | null; onCLose?: (updated?: boolean) => void };
export default function ChangePasswordUser({ user, onCLose }: Props) {
  if (!user) return <></>;

  const { useAxios } = useAuth();
  const [{ loading: putLoading, error: putError, response: responseUpdate }, executePut] = useAxios({ url: "/cp-users/" + user?.id, method: "PUT" }, { manual: true });
  const [data, setData] = useState({ password: "", password_confirm: "" });
  const [errors, setErrors] = useState({ password: "", password_confirm: "" });
  function updateData(e: React.FormEvent) {
    e.preventDefault();
    executePut({ data: { password: data.password } });
  }
  useEffect(() => {
    if (responseUpdate?.status && responseUpdate.status >= 200 && responseUpdate.status < 300) {
      closeModal(true);
    }
    return () => {};
  }, [responseUpdate]);

  let [isOpen, setIsOpen] = useState(!!user);
  useEffect(() => {
    setIsOpen(!!user);
    return () => {};
  }, [user]);

  function closeModal(updated?: boolean) {
    setIsOpen(false);
    onCLose && onCLose(updated);
  }

  function validatePassword(confirmPass: string) {
    if (data.password !== confirmPass) return setErrors({ ...errors, password_confirm: "sorry.! password does not match" });
    setErrors({ password: "", password_confirm: "" });
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          static={true}
          className="relative z-40"
          onClose={() => {
            if (event instanceof PointerEvent === false) {
              closeModal();
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-20 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 border-b px-6 pb-5 mb-2 -mx-6 flex justify-between">
                    <span> Update Password user</span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={updateData}>
                    <InputCustom
                      error={errors["password"]}
                      label="Password"
                      type="password"
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      value={data.password}
                    />
                    <InputCustom
                      label="Password Confirm"
                      type="password"
                      error={errors.password_confirm}
                      onChange={(e) => {
                        validatePassword(e.target.value);
                        setData({ ...data, password_confirm: e.target.value });
                      }}
                      value={data.password_confirm}
                    />
                    <div className="mt-4">
                      <ButtonCustom disabled={putLoading} type="submit" className="w-full">
                        Update Password
                      </ButtonCustom>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
