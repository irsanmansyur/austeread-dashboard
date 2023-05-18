import { AppInterface } from "@/commons/interface/app";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { InputCustom, ButtonCustom, SelectCustom } from "@/components/form";
import { VscChromeClose } from "react-icons/vsc";
import { useAuth } from "@/context/auth";
type Props = { open?: boolean; onCLose?: (updated?: boolean) => void };
export default function CreateSubCategory({ open = false, onCLose }: Props) {
  let [isOpen, setIsOpen] = useState(open);
  const { useAxios, user } = useAuth();
  const [{ loading: loadingCategory, data: dataCategory = { data: [] } }] = useAxios<{ data: AppInterface.CategoryProduct[] }>("/products-category");
  const [{ loading: postLoading, error: postError, response: responsePost }, executePost] = useAxios({ url: "/products-subcategory", method: "POST" }, { manual: true });
  const [data, setData] = useState({ name: "", category_id: "" });

  useEffect(() => {
    if (responsePost?.status && responsePost.status >= 200 && responsePost.status < 300) {
      setData({ ...data, name: "" });
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

  function updateData(e: React.FormEvent) {
    e.preventDefault();
    executePost({ data });
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
                    <span>Create Category</span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={updateData}>
                    <SelectCustom
                      label="Product Category"
                      value={data.category_id}
                      onChange={(e) => setData({ ...data, category_id: e.target.value })}
                      options={dataCategory.data.map((ctg) => ({ value: ctg.id, label: ctg.name }))}
                    />
                    <InputCustom label="Category Name" onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
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
