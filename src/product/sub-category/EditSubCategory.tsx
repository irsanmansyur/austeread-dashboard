import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { InputCustom, ButtonCustom, SelectCustom } from "@/components/form";
import { VscChromeClose } from "react-icons/vsc";
import { useAuth } from "@/context/auth";
import { AppInterface } from "@/commons/interface/app";
type Props = { subCategory?: AppInterface.SubProductCategory; onCLose?: (updated?: boolean) => void };
export default function SubCategoryEdit({ onCLose, subCategory }: Props) {
  if (!subCategory) return <></>;

  const { useAxios } = useAuth();
  const [{ loading: loadingCategory, data: dataCategory = { data: [] } }] = useAxios<{ data: AppInterface.CategoryProduct[] }>("/products-category");
  let [isOpen, setIsOpen] = useState(!!subCategory);
  const [{ loading: putLoading, error: putError, response: responsePut }, executePost] = useAxios({ url: "/products-category/" + subCategory.id, method: "PUT" }, { manual: true });
  const [data, setData] = useState(subCategory);

  useEffect(() => {
    if (responsePut?.status && responsePut.status >= 200 && responsePut.status < 300) {
      setData({ ...data, name: "", category_id: "" });
      closeModal(true);
    }
    return () => {};
  }, [responsePut]);

  useEffect(() => {
    setIsOpen(!!subCategory);
    return () => {};
  }, [subCategory]);

  function closeModal(updated?: boolean) {
    setIsOpen(false);
    onCLose && onCLose(updated);
  }

  function updateData(e: React.FormEvent) {
    e.preventDefault();
    executePost({ data: { name: data.name, category_id: data.category_id } });
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
                    <span>Update Category</span>
                    <VscChromeClose className="cursor-pointer" onClick={(e) => closeModal()} />
                  </Dialog.Title>
                  <form className="my-6" onSubmit={updateData}>
                    <SelectCustom
                      label="Product Category"
                      value={data.category_id}
                      onChange={(e) => setData({ ...data, category_id: e.target.value })}
                      options={dataCategory.data.map((ctg) => ({ value: ctg.id, label: ctg.name }))}
                    />
                    <InputCustom label="Sub Category Name" onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
                    <div className="mt-4">
                      <ButtonCustom disabled={putLoading} type="submit" className="w-full">
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
