import ImportButton from "@/components/header/import-button";
import { ModeToggle } from "@/components/header/mode-toggle";
import NewProjectButton from "@/components/header/new-project";
import SearchInput from "@/components/header/search-input";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-transparent backdrop-blur-xl z-50">
      <div className=" flex items-center py-4 gap-x-10 px-5">
        <SidebarTrigger className="p-1" />
        <div className="w-full flex items-center gap-x-6">
          <SearchInput />
          <ModeToggle />
          <div className="flex items-center gap-x-4">
            <ImportButton />
            <NewProjectButton />
          </div>
        </div>
      </div>
    </header>
  );
};
