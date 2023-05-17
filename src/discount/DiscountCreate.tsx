import { AppInterface } from "@/commons/interface/app";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useAuth } from "@/context/auth";
import { ButtonCustom, InputCustom } from "@/components/form";
import { useMessage } from "@/commons/hooks/message";
import { NumericFormat } from "react-number-format";

type Props = { open: boolean; onCLose?: (updated?: boolean) => void };
export default function DiscountCreateModal({ open, onCLose }: Props) {
  const { setMessage } = useMessage();
  const { useAxios } = useAuth();
  const [{ loading: loadingPost, error: errorPost, response: responsePost }, executePost] = useAxios({ url: "/discount_code", method: "POST" }, { manual: true });
  const [data, setData] = useState({ code: "", price: 0 });

  function updateData(e: React.FormEvent) {
    e.preventDefault();
    executePost({ data }).then((res) => {
      setMessage({ type: "success", message: res.data["message"] + "" });
    });
  }

  useEffect(() => {
    if (responsePost?.status && responsePost.status >= 200 && responsePost.status < 300) {
      closeModal(true);
    }
    return () => {};
  }, [responsePost]);

  let [isOpen, setIsOpen] = useState(open);

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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 border-b px-6 pb-5 mb-2 -mx-6 flex justify-between">
                    <span>Create Discount Code </span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={updateData}>
                    <InputCustom label={"Code"} onChange={(e) => setData({ ...data, code: e.target.value })} value={data.code} />
                    <div>
                      <label htmlFor="priceInputEdit" className="mb-2 pb-2">
                        Price
                      </label>
                      <NumericFormat
                        value={data.price}
                        prefix={"Rp "}
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-base text-xs focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary focus:outline-none text-left content-end"
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        onValueChange={(values, _) => {
                          setData({ ...data, price: +values.value });
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <ButtonCustom disabled={loadingPost} type="submit" className="w-full">
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
