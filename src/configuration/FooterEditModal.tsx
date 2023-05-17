import { AppInterface } from "@/commons/interface/app";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useAuth } from "@/context/auth";
import { ButtonCustom, EditorText, InputCustom, InputError } from "@/components/form";
import { useMessage } from "@/commons/hooks/message";
type Props = { footerConfig?: AppInterface.ShopFooter; onCLose?: (updated?: boolean) => void };
export default function FooterEditModal({ footerConfig, onCLose }: Props) {
  if (!footerConfig) return <></>;

  const { setMessage } = useMessage();
  const { useAxios } = useAuth();
  const [{ loading: putLoading, error: putError, response: responsePut }, executePut] = useAxios({ url: "/shopFooter/" + footerConfig?.id, method: "PUT" }, { manual: true });
  const [data, setData] = useState({ name: footerConfig?.name, value: footerConfig?.value });

  function updateData(e: React.FormEvent) {
    e.preventDefault();
    executePut({ data }).then((res) => {
      setMessage({ type: "success", message: res.data["message"] + "" });
    });
  }

  useEffect(() => {
    if (responsePut?.status && responsePut.status >= 200 && responsePut.status < 300) {
      closeModal(true);
    }
    return () => {};
  }, [responsePut]);

  let [isOpen, setIsOpen] = useState(!!footerConfig);

  useEffect(() => {
    setIsOpen(!!footerConfig);
    return () => {};
  }, [footerConfig]);

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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 border-b px-6 pb-5 mb-2 -mx-6 flex justify-between">
                    <span> Edit Shop Footer</span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={updateData}>
                    <InputCustom label={"Name Footer"} onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
                    <div className="mt-4">
                      <label htmlFor="content" className="font-bold pb-2">
                        Content
                      </label>
                      <EditorText folder="upload/article" height={400} textHtml={data.value} onChange={(htmlText) => setData({ ...data, value: htmlText })} />
                    </div>
                    <div className="mt-4">
                      <ButtonCustom disabled={putLoading} type="submit" className="w-full">
                        Update
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
