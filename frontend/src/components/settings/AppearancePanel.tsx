import { useEffect, useState } from "react";

// Icons - replace with your icon library
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

type Theme = "light" | "dark" | "system";

export default function AppearancePanel({ onClose }: { onClose: () => void }) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const save = () => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    onClose();
  };

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    
    if (selectedTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", systemPrefersDark);
    } else {
      root.classList.toggle("dark", selectedTheme === "dark");
    }
  };

  const themeOptions = [
    {
      value: "light" as Theme,
      label: "Light",
      description: "Classic light appearance",
      icon: <SunIcon />,
    },
    {
      value: "dark" as Theme,
      label: "Dark",
      description: "Easy on the eyes in low light",
      icon: <MoonIcon />,
    },
    {
      value: "system" as Theme,
      label: "System",
      description: "Automatically match your system settings",
      icon: <SystemIcon />,
    },
  ];

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Appearance</h3>
        <p className="text-gray-600">
          Customize how GoodFirstIssues looks on your device. Choose a theme that's comfortable for your eyes.
        </p>
      </div>

      {/* Theme Selection */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Theme</h4>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                theme === option.value
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-lg ${
                  theme === option.value ? "bg-yellow-400 text-gray-900" : "bg-gray-100 text-gray-600"
                }`}>
                  {option.icon}
                </div>
                <div className="text-center">
                  <div className={`font-medium ${
                    theme === option.value ? "text-gray-900" : "text-gray-700"
                  }`}>
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {option.description}
                  </div>
                </div>
              </div>
              {theme === option.value && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Preview</h4>
        <div className={`rounded-xl overflow-hidden border ${
          theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}>
          <div className={`p-4 border-b ${
            theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "border-gray-700"
              : "border-gray-200"
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded ${
                theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`} />
              <div className="space-y-2 flex-1">
                <div className={`h-2 w-1/3 rounded ${
                  theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "bg-gray-700"
                    : "bg-gray-300"
                }`} />
                <div className={`h-2 w-1/2 rounded ${
                  theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "bg-gray-800"
                    : "bg-gray-200"
                }`} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className={`p-3 rounded-lg ${
                  theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "bg-gray-800"
                    : "bg-gray-50"
                }`}>
                  <div className={`h-2 w-2/3 rounded mb-2 ${
                    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`} />
                  <div className={`h-2 w-full rounded ${
                    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4 mb-8">
        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <div className="font-medium text-gray-900">Sync with system</div>
            <div className="text-sm text-gray-500">Automatically switch themes based on your system preferences</div>
          </div>
          <input
            type="checkbox"
            checked={theme === "system"}
            onChange={(e) => setTheme(e.target.checked ? "system" : "light")}
            className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 accent-yellow-400"
          />
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
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