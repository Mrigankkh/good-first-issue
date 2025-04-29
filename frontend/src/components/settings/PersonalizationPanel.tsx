import { useEffect, useState } from "react";

const PAGE_SIZE_KEY = "goodfirstissues_ipp";

export default function PersonalizationPanel({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(20);

  useEffect(() => {
    const cached = localStorage.getItem(PAGE_SIZE_KEY);
    if (cached) {
      setSelected(Number(cached));
    }
  }, []);

  const save = () => {
    localStorage.setItem(PAGE_SIZE_KEY, String(selected));
    onClose();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Pagination Settings</h3>
      <p className="text-sm text-gray-600 mb-4">
        Choose how many issues to show per page.
      </p>

      <div className="space-y-3">
        {[10, 20, 50, 100].map((num) => (
          <label key={num} className="flex items-center space-x-3">
            <input
              type="radio"
              name="issuesPerPage"
              value={num}
              checked={selected === num}
              onChange={() => setSelected(num)}
            />
            <span>{num} issues per page</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end mt-6 space-x-4">
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
