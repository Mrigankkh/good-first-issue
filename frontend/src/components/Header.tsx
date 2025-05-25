import { useState } from "react";
import SettingsModal from "@/components/settings/SettingModal";
import { formatTimestamp } from "@/utils/formatDate";

export default function Header({
  onOpenSettings,
  updateTimestamp: lastUpdated,
}: {
  onOpenSettings: () => void;
  updateTimestamp: string | null;
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Good First Issues</h1>

        <div className="flex items-center space-x-6">
          <span className="text-sm text-gray-500 ">
            Last Updated: {lastUpdated} hours ago
          </span>

          <div className="h-4 w-px bg-gray-300" />

          <button
            onClick={onOpenSettings}
            className="text-sm text-gray-700 font-semibold hover:text-gray-900   transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 "
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}
