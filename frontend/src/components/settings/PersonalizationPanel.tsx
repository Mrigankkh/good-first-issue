import { useEffect, useState } from "react";
import { getPersonalization, setPersonalization } from "@/lib/store";

import { CheckIcon } from "../../icons/check";

const PAGE_SIZE_KEY = "goodfirstissues_ipp";


export default function PersonalizationPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(20);

  useEffect(() => {
    const data = getPersonalization();
    if (data?.issuesPerPage) {
      setSelected(data.issuesPerPage);
    }
  }, []);

  const save = () => {
    setPersonalization({ issuesPerPage: selected });
    onClose();
  };

  const options = [
    { value: 10, label: "10 issues per page", description: "Compact view for quick browsing" },
    { value: 20, label: "20 issues per page", description: "Recommended for most users" },
    { value: 50, label: "50 issues per page", description: "Extended view for power users" },
    { value: 100, label: "100 issues per page", description: "Maximum density" },
  ];

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pagination Settings</h3>
        <p className="text-gray-600">
          Control how many issues appear on each page. This setting helps you customize your browsing experience.
        </p>
      </div>

      {/* Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className={`relative flex items-start p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selected === option.value
                  ? "bg-yellow-50 border-2 border-yellow-400"
                  : "hover:bg-gray-50 border-2 border-transparent"
              }`}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="issuesPerPage"
                  value={option.value}
                  checked={selected === option.value}
                  onChange={() => setSelected(option.value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === option.value
                      ? "border-yellow-400 bg-yellow-400"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className={`text-base font-medium ${
                  selected === option.value ? "text-gray-900" : "text-gray-900"
                }`}>
                  {option.label}
                </div>
                <div className={`text-sm mt-1 ${
                  selected === option.value ? "text-gray-700" : "text-gray-500"
                }`}>
                  {option.description}
                </div>
              </div>
              {selected === option.value && (
                <div className="ml-4 flex-shrink-0 text-yellow-600">
                  <CheckIcon />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-8 space-x-3">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={save}
          className="px-6 py-2.5 rounded-lg font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}