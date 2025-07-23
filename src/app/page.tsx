"use client"
import { useEffect, useState } from "react";
export default function Home() {
 return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center w-1/3">
        <p className="font-intert text-2xl font-bold mb-4">Welcome Back!</p>
        <div className="border p-3 rounded-sm text-left inset-shadow-sm/20">
          <textarea
            placeholder="Describe your workflow"
            className="h-8 resize-none w-full outline-none placeholder:font-inter placeholder:font-bold"
          />
        </div>
      </div>
    </div>
  );
}
