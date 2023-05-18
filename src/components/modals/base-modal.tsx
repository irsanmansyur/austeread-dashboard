import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  open?: boolean;
  header?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
};
export default function BaseModal({ onClose = () => {}, header, children, className, open = false }: Props) {
  const [isOpen, setIsOpen] = useState(open);
  function closeModal() {
    setIsOpen(false);
    onClose();
  }
  useEffect(() => {
    setIsOpen(open);
    return () => {};
  }, [open]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
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
              <Dialog.Panel className={twMerge("w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all", className)}>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 border-b px-6 pb-5 mb-2 -mx-6 flex justify-between">
                  {header}
                  <Icon className="cursor-pointer" icon={"ic:baseline-close"} onClick={(e) => closeModal()} />
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
