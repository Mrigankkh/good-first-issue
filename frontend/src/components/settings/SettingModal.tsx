import { useState, useEffect, Fragment } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import FavoritesPanel from "./FavoritesPanel";
import PersonalizationPanel from "./PersonalizationPanel";
import {SettingsIcon} from '../../icons/settings'
import {StarIcon} from '../../icons/star'
import {PersonIcon} from '../../icons/person'
import {BrushIcon} from '../../icons/brush'
import AppearancePanel from "./AppearancePanel";

type Panel = "favorites" | "personalization" | "appearance";

// Icons - you can replace these with actual icon components from lucide-react or heroicons


export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activePanel, setActivePanel] = useState<Panel>("favorites");

  const menuItems = [
    { id: "favorites", label: "Select Favorites", icon: <StarIcon /> },
    { id: "personalization", label: "Personalization", icon: <PersonIcon /> },
    { id: "appearance", label: "Appearance", icon: <BrushIcon /> },
  ];

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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-72 bg-gray-50 border-r border-gray-200">
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-400 rounded-lg text-gray-900">
                        <SettingsIcon />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActivePanel(item.id as Panel)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          activePanel === item.id
                            ? "bg-yellow-50 text-gray-900 font-medium shadow-sm border-l-4 border-yellow-400"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className={activePanel === item.id ? "text-yellow-600" : "text-gray-400"}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-50">
                  <div className="h-full overflow-y-auto">
                    <div className="p-8">
                      {activePanel === "favorites" && <FavoritesPanel onClose={onClose} />}
                      {activePanel === "personalization" && <PersonalizationPanel onClose={onClose} />}
                      {activePanel === "appearance" && <AppearancePanel onClose={onClose} />}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}