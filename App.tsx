
import React, { useState, useEffect, useCallback } from 'react';
import ClockFace from './components/ClockFace';

const App: React.FC = () => {
  // State for clock hand angles
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  
  // State for debug display
  const [actualTime, setActualTime] = useState('');
  const [roundedTime, setRoundedTime] = useState('');

  // State for manual time override
  const [manualTime, setManualTime] = useState('');

  const updateClock = useCallback(() => {
    const now = new Date();
    // Always show the real system time
    setActualTime(now.toLocaleTimeString('en-GB'));

    let timeToUse = now;

    // Check for a valid manual time input (HH:MM)
    const manualTimeMatch = manualTime.match(/^(\d{2}):(\d{2})$/);
    if (manualTimeMatch) {
      const manualHours = parseInt(manualTimeMatch[1], 10);
      const manualMinutes = parseInt(manualTimeMatch[2], 10);

      // Validate the parsed time
      if (manualHours >= 0 && manualHours <= 23 && manualMinutes >= 0 && manualMinutes <= 59) {
        const manualDate = new Date();
        manualDate.setHours(manualHours, manualMinutes, 0, 0); // Use 0 for seconds
        timeToUse = manualDate;
      }
    }

    let hours = timeToUse.getHours();
    const minutes = timeToUse.getMinutes();

    let roundedMinutes;

    if (minutes >= 53 || minutes <= 7) {
      roundedMinutes = 0;
      if (minutes >= 53) {
        hours = (hours + 1) % 24; // Increment hour, wrapping from 23 to 0
      }
    } else if (minutes >= 8 && minutes <= 22) {
      roundedMinutes = 15;
    } else if (minutes >= 23 && minutes <= 37) {
      roundedMinutes = 30;
    } else { // 38-52
      roundedMinutes = 45;
    }
    
    // Set rounded time for debug display
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedRoundedHours = String(displayHours).padStart(2, '0');
    const formattedRoundedMinutes = String(roundedMinutes).padStart(2, '0');
    setRoundedTime(`${formattedRoundedHours}:${formattedRoundedMinutes}`);
    
    // Calculate angles for clock hands based on rounded time
    const hoursForAngle = hours % 12;
    const newMinuteAngle = roundedMinutes * 6; // 360 / 60 = 6 degrees per minute
    const newHourAngle = (hoursForAngle * 30) + (roundedMinutes * 0.5); // 360 / 12 = 30 deg/hr + 0.5 deg/min

    setHourAngle(newHourAngle);
    setMinuteAngle(newMinuteAngle);
  }, [manualTime]); // Re-create updateClock whenever manualTime changes

  useEffect(() => {
    // Set the initial time immediately & update when manualTime changes
    updateClock(); 
    
    // Update the clock every second. The interval will be reset if updateClock changes.
    const timerId = setInterval(updateClock, 1000);

    // Clean up the interval when the component unmounts or updateClock changes
    return () => clearInterval(timerId);
  }, [updateClock]);


  const handleReset = () => {
    setManualTime('');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-white">
      <div className="w-[90vmin] aspect-square">
        <ClockFace hourAngle={hourAngle} minuteAngle={minuteAngle} />
      </div>
      
      {/* Debug overlay */}
      <div className="mt-[2vmin] font-mono text-black text-[2vmin] lg:text-base text-center" aria-live="polite">
        {/* Time display */}
        <div className="mb-2">
            <p>Actual time:  {actualTime}</p>
            <p>Rounded time: {roundedTime}</p>
        </div>
        
        {/* Manual time controls */}
        <div className="flex items-center justify-center gap-2">
             <input
                type="text"
                value={manualTime}
                onChange={(e) => setManualTime(e.target.value)}
                placeholder="HH:MM"
                aria-label="Manual time input"
                className="border border-gray-400 rounded px-2 py-1 w-[15vmin] max-w-24 text-center"
             />
             <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-black rounded px-3 py-1"
             >
                Reset
             </button>
        </div>
      </div>
    </main>
  );
};

export default App;
