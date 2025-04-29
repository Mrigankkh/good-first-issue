import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { DEFAULT_ORGS } from "@/constants/orgs";

const FAVORITES_KEY = "goodfirstissues_favorites";

export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activePanel, setActivePanel] = useState<"favorites">("favorites");
  const [orgs, setOrgs] = useState<{ name: string; checked: boolean }[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem(FAVORITES_KEY);
    if (cached) {
      setOrgs(JSON.parse(cached));
    } else {
      setOrgs(DEFAULT_ORGS);
    }
  }, []);

  const toggleOrg = (index: number) => {
    const updated = [...orgs];
    updated[index].checked = !updated[index].checked;
    setOrgs(updated);
  };

  const addOrg = (name: string) => {
    if (!name.trim()) return;
    setOrgs((prev) => [
      ...prev,
      { name: name.trim().toLowerCase(), checked: true },
    ]);
  };

  const saveSettings = () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(orgs));
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30  transition-opacity" />
        </TransitionChild>
        {/* Modal Container */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-4/5  transform overflow-hidden rounded-2xl bg-white text-gray-900 p-0 text-left align-middle shadow-xl transition-all">
                {/* Flexbox Layout */}
                <div className="flex min-h-[70vh]">
                  {/* Left Menu */}
                  <div className="w-1/4 border-r p-4 space-y-4">
                    <h2 className="text-lg font-semibold mb-2">Settings</h2>

                    <button
                      onClick={() => setActivePanel("favorites")}
                      className={`block w-full text-left p-2 rounded hover:bg-gray-100 ${
                        activePanel === "favorites"
                          ? "bg-gray-200 font-semibold"
                          : ""
                      }`}
                    >
                      Select Favorites
                    </button>
                  </div>

                  {/* Right Panel */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    {activePanel === "favorites" && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">
                          Select Favorite Organizations
                        </h3>

                        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                          {orgs.map((org, index) => (
                            <label
                              key={org.name}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={org.checked}
                                onChange={() => toggleOrg(index)}
                              />
                              <span className="capitalize">{org.name}</span>
                            </label>
                          ))}
                        </div>

                        <div className="flex space-x-2 mb-4">
                          <input
                            id="new-org"
                            placeholder="Add new org..."
                            className="border px-3 py-2 rounded w-full"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addOrg((e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = "";
                              }
                            }}
                          />
                        </div>

                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveSettings}
                            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
