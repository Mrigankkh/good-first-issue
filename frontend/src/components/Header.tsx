import { useState } from "react";
import SettingsModal from "@/components/settings/SettingModal";
export default function Header({ onOpenSettings }: { onOpenSettings: () => void }) {


  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Good First Issues</h1>
        <button
          onClick={onOpenSettings}
          className="text-sm text-gray-800 font-semibold hover:underline"
        >
          Settings
        </button>
      </div>
  
    </header>
  );
}
