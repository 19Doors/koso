import gsap from "gsap";

export const dropdownAnimations = {
  open: (element) => {
    return gsap.to(element, {
      y: 4,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  },
  
  close: (element) => {
    return gsap.to(element, {
      y: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }
};

export const messageAnimations = {
  hideWelcome: (element) => {
    return gsap.to(element, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  },
  
  moveContainer: (element) => {
    return gsap.to(element, {
      position: "absolute",
      display: "block",
      alignItems: "unset",
      justifyContent: "unset",
      height: "auto",
      duration: 0.3,
      ease: "power1.inOut"
    });
  },
  
  resizeInput: (element) => {
    return gsap.to(element, {
      width: "50%",
      duration: 0.3,
      ease: "power2.out",
    });
  }
};

export const pageAnimations = {
  hideLoader: (element) => {
    return gsap.to(element, {
      width: "0%",
      duration: 0.5,
      ease: "power3.out",
    });
  }
};
