import { useEffect, useRef, useState } from "react";

export default function ScrollSwapBox() {
  const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const items = [
    { id: 1, title: "Creative Design", desc: "Beautifully designed interfaces with modern aesthetics." },
    { id: 2, title: "Responsive Layout", desc: "Works perfectly on all devices and screen sizes." },
    { id: 3, title: "Smooth Animations", desc: "Fluid transitions that enhance user experience." },
    { id: 4, title: "Interactive Elements", desc: "Engaging components that respond to user actions." },
    { id: 5, title: "Cross-Browser Support", desc: "Consistent experience across all modern browsers." },
    { id: 6, title: "Performance Optimized", desc: "Fast loading times even on slower connections." },
  ];

  // Double the items for seamless looping
  const duplicatedItems = [...items, ...items];

  useEffect(() => {
    let scrollPosition = 0;
    const scrollSpeed = 1; // Pixels per frame
    
    const animateScroll = () => {
      if (!isPaused && containerRef.current) {
        const container = containerRef.current;
        const scrollWidth = container.scrollWidth / 2; // Since we duplicated items
        
        // Reset position when we've scrolled through one set
        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0;
          // Instantly jump back (visually hidden by overflow)
          container.scrollLeft = 0;
        }
        
        scrollPosition += scrollSpeed;
        container.scrollLeft = scrollPosition;
      }
      
      animationRef.current = requestAnimationFrame(animateScroll);
    };

    animationRef.current = requestAnimationFrame(animateScroll);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="scroll-app">
      <h1>Infinite Horizontal Scroll</h1>
      <p className="subtitle">Scrolls automatically, loops smoothly when reaching the end</p>
      
      <div 
        className="scroll-container-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="scroll-container" ref={containerRef}>
          <div className="scroll-content" ref={scrollRef}>
            {duplicatedItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className={`scroll-item ${isPaused ? 'paused' : ''}`}
              >
                <div className="item-number">{item.id}</div>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-desc">{item.desc}</p>
                <div className="item-status">
                  {isPaused ? 'Paused' : 'Auto-scrolling'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="gradient-overlay left"></div>
        <div className="gradient-overlay right"></div>
      </div>
      
      <div className="controls">
        <button onClick={() => setIsPaused(!isPaused)} className="pause-btn">
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <div className="instructions">
          <p><span className="icon">⏸️</span> Hover to pause • <span className="icon">▶️</span> Click to toggle</p>
        </div>
      </div>
    </div>
  );
};
}
