import { useEffect, useState } from "react";
import { DEFAULT_ORGS } from "@/constants/orgs";

const FAVORITES_KEY = "goodfirstissues_favorites";

export default function FavoritesPanel({ onClose }: { onClose: () => void }) {
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
    const normalized = name.trim().toLowerCase();
    if (orgs.find((o) => o.name === normalized)) return; // Avoid duplicates
    setOrgs([...orgs, { name: normalized, checked: true }]);
  };

  const save = () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(orgs));
    onClose();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Select Favorite Organizations</h3>

      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {orgs.map((org, index) => (
          <label key={org.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={org.checked}
              onChange={() => toggleOrg(index)}
            />
            <span className="capitalize">{org.name}</span>
          </label>
        ))}
      </div>

      <input
        placeholder="Add new org..."
        className="border px-3 py-2 rounded w-full mb-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addOrg((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />

      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={save}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
