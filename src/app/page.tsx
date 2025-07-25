"use client";
import { DropdownButton } from "@/components/DropDownButton";
import { authClient } from "@/lib/auth-client";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // References
  const bgs = useRef(null);

  // Check if Valid Session
  useEffect(() => {
    async function isAuth() {
      const { data: session, error } = await authClient.getSession();
      if (!session) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    }
    isAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.to(bgs.current, {
        width: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [loading]);

  // Functions
  async function handleSignOut() {
    await authClient.signOut();
    router.push("/auth");
  }
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div
        ref={bgs}
        className="absolute inset-0 w-full h-full bg-foreground z-50"
      />
      <div className="absolute right-7 top-2 flex flex-col">
      </div>
      <div className="text-center w-1/3">
        <p className="font-intert text-2xl font-bold mb-4">Welcome Back!</p>
        <div className="border p-3 rounded-sm text-left inset-shadow-sm/20">
          <textarea
            placeholder="Describe your workflow"
            className="h-8 resize-none w-full outline-none placeholder:font-inter placeholder:font-bold"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <button
          className="font-sg font-bold text-lg cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
