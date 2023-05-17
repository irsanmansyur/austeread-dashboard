import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useAuth } from "@/context/auth";
import { ButtonCustom, EditorText, InputCustom } from "@/components/form";
import { useMessage } from "@/commons/hooks/message";
type Props = { open: boolean; onCLose?: (updated?: boolean) => void };
export default function FooterCreateModal({ open, onCLose }: Props) {
  const { setMessage } = useMessage();
  const { useAxios } = useAuth();
  const [{ loading: postLoading, error: postError, response: responsePost }, executePut] = useAxios({ url: "/shopFooter", method: "POST" }, { manual: true });
  const [data, setData] = useState({ name: "", value: "" });

  function createSubmit(e: React.FormEvent) {
    e.preventDefault();
    executePut({ data }).then((res) => {
      setMessage({ type: "success", message: res.data["message"] + "" });
    });
  }

  useEffect(() => {
    if (responsePost?.status && responsePost.status >= 200 && responsePost.status < 300) {
      closeModal(true);
    }
    return () => {};
  }, [responsePost]);

  let [isOpen, setIsOpen] = useState<boolean | undefined>(false);

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
                    <span> Create Shop Footer</span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={createSubmit}>
                    <InputCustom label={"Name Footer"} onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
                    <div className="mt-4">
                      <label htmlFor="content" className="font-bold pb-2">
                        Content
                      </label>
                      <EditorText folder="upload/article" height={400} textHtml={data.value} onChange={(htmlText) => setData({ ...data, value: htmlText })} />
                    </div>
                    <div className="mt-4">
                      <ButtonCustom disabled={postLoading} type="submit" className="w-full">
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
