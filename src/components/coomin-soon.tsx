import { updateClock } from "@/commons/helpers/date/jam";
import { useEffect, useState } from "react";

export default function CoominSoon() {
  const [timeNow, setTimeNow] = useState(updateClock());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeNow(updateClock());
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-start justify-center bg-gradient-to-br from-primary to-primary-light p-10 rounded shadow my-10">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center md:text-left">
        We Are <span className="text-yellow-300">Coming</span> Soon
      </h1>
      <div className="mt-12 flex flex-col items-center mt-8 ml-2">
        <p className="text-gray-300 uppercase text-sm">Time Now until lunching</p>
        <div className="flex items-center justify-center space-x-4 mt-4" x-data="timer(new Date().setDate(new Date().getDate() + 1))" x-init="init();">
          <div className="flex flex-col items-center px-4">
            <span x-text="time().hours" className="text-4xl lg:text-5xl text-gray-200">
              {timeNow.hours < 10 ? `0${timeNow.hours}` : timeNow.hours}
            </span>
            <span className="text-gray-400 mt-2">Hours</span>
          </div>
          <span className="w-[1px] h-24 bg-gray-400" />
          <div className="flex flex-col items-center px-4">
            <span x-text="time().minutes" className="text-4xl lg:text-5xl text-gray-200">
              {timeNow.minutes < 10 ? `0${timeNow.minutes}` : timeNow.minutes}
            </span>
            <span className="text-gray-400 mt-2">Minutes</span>
          </div>
          <span className="w-[1px] h-24 bg-gray-400" />
          <div className="flex flex-col items-center px-4">
            <span className="text-4xl lg:text-5xl text-gray-200">{timeNow.seconds < 10 ? `0${timeNow.seconds}` : timeNow.seconds}</span>
            <span className="text-gray-400 mt-2">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
