import ImportButton from "@/components/header/import-button";
import { ModeToggle } from "@/components/header/mode-toggle";
import NewProjectButton from "@/components/header/new-project";
import SearchInput from "@/components/header/search-input";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-transparent backdrop-blur-xl z-50">
      <div className="w-full  flex  flex-col lg:flex-row items-center py-4 gap-x-10 px-5">
        <div className="w-full flex items-center gap-x-6">
          <SidebarTrigger className="p-1" />
          <SearchInput />
          
        </div>
        <div className="flex items-center gap-x-6 mt-4 lg:mt-0 w-full lg:w-fit justify-between  ">
          <div className="flex items-center gap-x-6">
            <ImportButton />
            <NewProjectButton />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
