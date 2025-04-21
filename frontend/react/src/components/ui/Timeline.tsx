import { useRef, useState } from "react";
import { TimelineType } from "../about-us/History";
import "../../assets/css/history.css";

const Timeline = ({ timeline }: { timeline: TimelineType[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      className={`timeline relative whitespace-nowrap ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="min-w-fit inline-block anim">
        <ol className="flex items-center justify-start relative w-fit py-[150px] px-4 max-sm:flex-col max-sm:items-start max-sm:gap-0">
          {timeline.map((item: TimelineType, index) => {
            const isFirst = index === 0;
            return (
              <li
                key={index}
                className={`relative flex flex-col items-center justify-center ${
                  isFirst ? "w-[320px]" : "w-[240px]"
                } shrink-0`}
              >
                <div
                  className={`timeline-time ${
                    isFirst
                      ? "w-[100px] h-[100px] text-[20px] border-[16px]"
                      : "w-[78px] h-[78px] text-[13px] border-2"
                  } rounded-full bg-white flex items-center justify-center font-bold ${
                    isFirst ? "text-[#033641]" : "text-black"
                  } border-[#3f6a78] z-10 `}
                >
                  <p className="time"> {item.title}</p>
                </div>
                <div
                  className={`mt-4 text-center ${
                    isFirst
                      ? "!text-white text-[20px] !mt-20"
                      : "!text-[#ffffffcc] text-[15px]"
                  } w-full !left-[50%] timeline-desc opacity-50`}
                >
                  {item.description.trim()}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
