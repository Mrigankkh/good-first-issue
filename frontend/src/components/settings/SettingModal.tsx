import { useState, useEffect, Fragment } from "react";
import { Dialog,DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import FavoritesPanel from "./FavoritesPanel";
import PersonalizationPanel from "./PersonalizationPanel";

type Panel = "favorites" | "personalization";

export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activePanel, setActivePanel] = useState<Panel>("favorites");

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
      <TransitionChild
  as={Fragment}
  enter="ease-out duration-300"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="ease-in duration-200"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div className="fixed inset-0 bg-black/30 transition-opacity" />
</TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-4/5 h-[90vh] bg-white rounded-2xl overflow-hidden shadow-xl text-gray-900">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-1/4 border-r p-4 space-y-4">
                <h2 className="text-lg font-semibold mb-2">Settings</h2>
                <button
                  onClick={() => setActivePanel("favorites")}
                  className={`block w-full text-left p-2 rounded hover:bg-gray-100 ${
                    activePanel === "favorites" ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  Select Favorites
                </button>
                <button
                  onClick={() => setActivePanel("personalization")}
                  className={`block w-full text-left p-2 rounded hover:bg-gray-100 ${
                    activePanel === "personalization" ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  Personalization
                </button>
              </div>

              {/* Panel content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activePanel === "favorites" && <FavoritesPanel onClose={onClose} />}
                {activePanel === "personalization" && <PersonalizationPanel onClose={onClose} />}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
