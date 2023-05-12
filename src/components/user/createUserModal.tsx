import { AppInterface } from "@/commons/interface/app";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { InputCustom } from "../form/InputGroup";
import SelectCustom from "../form/select";
import { VscChromeClose } from "react-icons/vsc";
import ButtonCustom from "../form/button";
import { useAuth } from "@/context/auth";
type Props = { open?: boolean; onCLose?: (updated?: boolean) => void };
export default function CreateUserModal({ open = false, onCLose }: Props) {
  let [isOpen, setIsOpen] = useState(open);
  const { useAxios } = useAuth();
  const [{ loading: postLoading, error: postError, response: responsePost }, executePost] = useAxios({ url: "/users", method: "POST" }, { manual: true });
  const [data, setData] = useState({ first_name: "", last_name: "", email: "", role: "", password: "" });
  function updateData(e: React.FormEvent) {
    e.preventDefault();
    executePost({ data });
  }
  useEffect(() => {
    if (responsePost?.status && responsePost.status >= 200 && responsePost.status < 300) {
      setData({ first_name: "", last_name: "", email: "", role: "", password: "" });
      closeModal(true);
    }
    return () => {};
  }, [responsePost]);

  useEffect(() => {
    setIsOpen(open);
    return () => {};
  }, [open]);

  function closeModal(updated?: boolean) {
    setIsOpen(false);
    onCLose && onCLose(updated);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
                    <span> Tambah User</span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={updateData}>
                    <InputCustom label="First Name" onChange={(e) => setData({ ...data, first_name: e.target.value })} value={data.first_name} />
                    <InputCustom label="Last Name" onChange={(e) => setData({ ...data, last_name: e.target.value })} value={data.last_name} />
                    <InputCustom label="Email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <SelectCustom
                      value={data.role}
                      label="Role"
                      onChange={(e) => setData({ ...data, role: e.target.value })}
                      options={[
                        { label: "Creator", value: "Creator" },
                        { label: "Administrator", value: "Administrator" },
                      ]}
                    />
                    <InputCustom label="Password" type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <div className="mt-4">
                      <ButtonCustom disabled={postLoading} type="submit" className="w-full">
                        Save
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
