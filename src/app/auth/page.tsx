"use client";

import { authClient } from "@/lib/auth-client";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function AnimatedButton({ children, onClick }) {
  const btnRef = useRef(null);
  const bgRef = useRef(null);

  const onEnter = () => {
    gsap.set(bgRef.current, { x: "-100%" });
    gsap.to(btnRef.current, {
      color: "#F9F8F8",
      duration: 0.3,
      ease: "power3.out",
      // scale: 1.1,
    });
    gsap.to(bgRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(btnRef.current, {
      color: "#272838",
      duration: 0.3,
      ease: "power3.out",
      // scale: 1.0,
    });
    gsap.to(bgRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={btnRef}
      className="relative overflow-hidden w-52 py-4 hover:cursor-pointer border border-2 shadow-md/20"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <span
        ref={bgRef}
        className="absolute inset-0 h-full w-full bg-foreground transition-none"
	style={{transform: "translateX(-100%)"}}
      ></span>
      <span className="relative font-bold text-2xl text-center block">
        {children}
      </span>
    </button>
  );
}
export default function Auth() {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [signupForm, setSignUpForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const bgs = useRef(null);
  useEffect(() => {}, [loading]);
  async function hitSignIn() {
    setLoading(true);
    let succ = false;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: (ctx) => {
          succ = true;
        },
      },
    );
    setLoading(false);
    if (succ) {
      gsap.to(bgs.current, {
        width: "100%",
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          router.push("/");
        },
      });
    }
  }
  async function hitSignUp() {
    setLoading(true);
    let succ = false;
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          succ = true;
        },
      },
    );
    setLoading(false);
    if (succ) {
      gsap.to(bgs.current, {
        width: "100%",
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          router.push("/");
        },
      });
    }
  }
  function clickSignUp() {
    let tl = gsap.timeline();
    tl.to(bgs.current, {
      width: "100%",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setShowForm(true);
        setSignUpForm(true);
      },
    }).to(bgs.current, {
      width: "0%",
      duration: 0.5,
      ease: "power3.out",
    });
  }
  function clickSignIn() {
    let tl = gsap.timeline();
    tl.to(bgs.current, {
      width: "100%",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setShowForm(true);
        setSignUpForm(false);
      },
    }).to(bgs.current, {
      width: "0%",
      duration: 0.5,
      ease: "power3.out",
    });
  }
  return (
    <div className="relative font-intert flex items-center justify-center w-full h-screen">
      <div
        ref={bgs}
        className="absolute z-50 bg-foreground w-0 h-full inset-0"
      ></div>
      {!showForm && (
        <div className="flex flex-col space-y-2">
          <AnimatedButton onClick={clickSignUp}>SignUp</AnimatedButton>
          <AnimatedButton onClick={clickSignIn}>SignIn</AnimatedButton>
        </div>
      )}
      {showForm && signupForm && (
        <div className="flex flex-col items-center space-y-8">
          <p className="font-bold font-intert text-4xl">Sign Up</p>
          <div className="flex flex-col items-start space-y-4">
            <input
              type="text"
              className="p-2 border outline-none border-1 w-128 hover:border-2"
              placeholder="John Doe"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              className="p-2 border outline-none border-1 w-128 hover:border-2"
              placeholder="johndoe@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="p-2 border outline-none border-1 w-128 hover:border-2"
              placeholder="******"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="button"
              value={loading ? "Loading" : "Submit"}
              className="font-intert font-bold hover:cursor-pointer p-2 outline-none border-1 w-1/4 hover:bg-foreground hover:text-background"
              onClick={hitSignUp}
            />
          </div>
        </div>
      )}
      {showForm && !signupForm && (
        <div className="flex flex-col items-center space-y-8">
          <p className="font-bold font-intert text-4xl">Sign In</p>
          <div className="flex flex-col items-start space-y-4">
            <input
              type="email"
              className="p-2 border outline-none border-1 w-128 hover:border-2"
              placeholder="johndoe@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="p-2 border outline-none border-1 w-128 hover:border-2"
              placeholder="******"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="button"
              value={loading ? "Loading" : "Submit"}
              className="font-intert font-bold hover:cursor-pointer p-2 outline-none border-1 w-1/4 hover:bg-foreground hover:text-background"
              onClick={hitSignIn}
            />
          </div>
        </div>
      )}
    </div>
  );
}
