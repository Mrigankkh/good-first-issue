import { useEffect, useState } from "react";
import { DEFAULT_ORGS } from "@/constants/orgs";

import {PlusIcon} from '../../icons/plus'
import { TrashIcon } from "../../icons/trash";

const FAVORITES_KEY = "goodfirstissues_favorites";




export default function FavoritesPanel({ onClose }: { onClose: () => void }) {
  const [orgs, setOrgs] = useState<{ name: string; checked: boolean }[]>([]);
  const [newOrgName, setNewOrgName] = useState("");

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

  const removeOrg = (index: number) => {
    const updated = orgs.filter((_, i) => i !== index);
    setOrgs(updated);
  };

  const addOrg = () => {
    if (!newOrgName.trim()) return;
    const normalized = newOrgName.trim().toLowerCase();
    if (orgs.find((o) => o.name === normalized)) return;
    setOrgs([...orgs, { name: normalized, checked: true }]);
    setNewOrgName("");
  };

  const save = () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(orgs));
    onClose();
  };

  const checkedCount = orgs.filter(o => o.checked).length;

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Favorite Organizations</h3>
        <p className="text-gray-600">
          Select the organizations you want to track. You're currently following {checkedCount} organization{checkedCount !== 1 ? 's' : ''}.
        </p>
      </div>

      {/* Add new org */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add New Organization
        </label>
        <div className="flex gap-2 text-gray-700">
          <input
            placeholder="Enter organization name..."
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addOrg();
              }
            }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={addOrg}
            className="px-4 py-2.5 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center gap-2 font-medium"
          >
            <PlusIcon />
            Add
          </button>
        </div>
      </div>

      {/* Organizations list */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-700">Your Organizations</h4>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {orgs.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No organizations added yet. Add one above to get started!
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orgs.map((org, index) => (
                <label
                  key={`${org.name}-${index}`}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={org.checked}
                    onChange={() => toggleOrg(index)}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 transition-all accent-yellow-400"
                  />
                  <span className="ml-3 flex-1 text-gray-900 capitalize">
                    {org.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeOrg(index);
                    }}
                    className="ml-2 p-1.5 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded hover:bg-red-50"
                  >
                    <TrashIcon />
                  </button>
                </label>
              ))}
            </div>
          )}
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