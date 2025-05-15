import gsap from "gsap";
import { useEffect, useRef } from "react";

const Header = () => {
  const underlineRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const underline = underlineRef.current;

    const handleMouseEnter = () => {
      gsap.to(underline, {
        width: "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(underline, {
        width: "0%",
        duration: 0.4,
        ease: "power2.in",
      });
    };

    const heading = headingRef.current;
    heading.addEventListener("mouseenter", handleMouseEnter);
    heading.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heading.removeEventListener("mouseenter", handleMouseEnter);
      heading.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="welcome p-8 flex flex-wrap items-center justify-center text-3xl text-[#fcfbfe] text-center">
      <span className="whitespace-nowrap">Hello User,</span>
      <span
        className="ml-2 relative font-bold text-[#ff00d4] group block"
        ref={headingRef}
      >
        Welcome
        <span
          ref={underlineRef}
          className="absolute left-0 -bottom-1 h-[4px] bg-[#ff00d4]"
          style={{ width: 0 }}
        />
      </span>
    </div>
  );
};

export default Header;
