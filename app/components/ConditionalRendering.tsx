'use client';
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalRendering() {
    const pathName = usePathname();
    
    if(pathName == "/SignIn"){
        return null;
    }
    return <Navbar />
}