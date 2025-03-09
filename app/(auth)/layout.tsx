import { ModeToggle } from "@/components/header/mode-toggle";
import { ReactNode } from "react";

 const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="w-screen h-screen flex items-center justify-center px-2 md:px-0 flex-col">
            <ModeToggle/>
            {children}
        </div>
    )
}
export default Layout


