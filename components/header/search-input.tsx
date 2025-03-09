import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="w-full relative">
        <Search className="size-5 absolute top-2.5 left-3 text-muted-foreground"/>
        <Input
          className="rounded-full h-10 pl-10 bg-accent"
          type="text"
          placeholder="Search by title"
        />
    </div>
  );
};

export default SearchInput;
