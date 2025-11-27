import { useEffect, useRef, useState } from "react";

export default function ScrollSwapBox() {
  const boxARef = useRef(null);
  const [showBoxB, setShowBoxB] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If Box A is NOT visible, show Box B
        setShowBoxB(!entry.isIntersecting);
      },
      { threshold: 0 } // trigger as soon as box A leaves viewport
    );

    if (boxARef.current) {
      observer.observe(boxARef.current);
    }

    return () => {
      if (boxARef.current) {
        observer.unobserve(boxARef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-[200vh] p-10 space-y-10">
      {/* Box A */}
      <div
        ref={boxARef}
        className="w-64 h-64 bg-blue-500 text-white flex items-center justify-center rounded-xl"
      >
        I’m Box A
      </div>

      <p>⬇️ Scroll down, hide Box A, then Box B will appear ⬇️</p>

      {/* Box B */}
      {showBoxB && (
        <div className="fixed bottom-5 right-5 w-48 h-48 bg-green-500 text-white flex items-center justify-center rounded-xl shadow-lg transition-all">
          I’m Box B 🎉
        </div>
      )}
    </div>
  );
}
