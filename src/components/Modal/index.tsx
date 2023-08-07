import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useIsMobile } from "redux/selector/mobile";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const isMobile = useIsMobile();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
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
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel>
              <div className="w-[90vw] h-[80vh] bg-blue-500 rounded-2xl shadow-inner border border-sky-900 px-2 flex flex-col relative">
                <div className="text-center my-3">
                  <Dialog.Title>
                    <span
                      className={[
                        isMobile ? "text-4xl" : "text-[5rem]",
                        "text-white font-normal leading-normal font-paytone text-stroke-black",
                      ].join(" ")}
                    >
                      {title}
                    </span>
                  </Dialog.Title>
                </div>
                <button className="absolute right-5 top-7" onClick={onClose}>
                  <img
                    className={isMobile ? "h-8" : "h-16"}
                    src={require("./close.png").default.src}
                    alt="close"
                  />
                </button>
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
