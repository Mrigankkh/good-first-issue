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

        <div className="flex items-center space-x-4">
          <h1 className="text-sm text-gray-400">
            Last Updated: {lastUpdated}{" hours ago"}
            {/* Last Updated: {"6 hours ago"}  */}
          </h1>
          <button
            onClick={onOpenSettings}
            className="text-sm text-gray-800 font-semibold hover:underline"
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}
