import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const NewProjectButton = () => {
  return (
    <Button className="flex items-center px-5 lg:px-8 xl:px-10">
      <Plus className='size-4' />
      New Project
    </Button>
  );
};

export default NewProjectButton;
