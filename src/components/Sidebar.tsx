"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import links from "./Links";
import Image from "next/image";
export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed z-50 inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:z-0 md:shadow-none",
        )}
      >
        {/* <div className='p-4 font-bold text-xl'>HRIS</div> */}
        {/* image */}
        <div className="p-4 h-20 relative overflow-hidden">
          <Image
            src="/assets/img/hriss.png"
            width={100}
            height={100}
            alt="Logo"
            className="w-2/5 lg:w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
