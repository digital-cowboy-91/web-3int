"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useStoreModal } from "../storeModal";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Modal = () => {
  const {
    config: { node, show },
    hide,
  } = useStoreModal();

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={hide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center sm:items-center md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden text-left shadow-xl transition-all w-full max-w-screen-lg sm:rounded-lg">
                <button
                  className="absolute end-0 m-8 me-4 md:me-8 border-2 rounded-full border-transparent hover:border-current duration-300"
                  onClick={hide}
                  aria-label="Close modal window"
                >
                  <XMarkIcon height="2rem" />
                </button>
                {node}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
