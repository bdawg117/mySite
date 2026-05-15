import Terminal from "./components/Terminal";
import { useState } from 'react'
import { resume } from "react-dom/server";
import resumeText from './text/resume.txt?raw'


function App() {
  const [showResume, setShowResume] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex transition-all duration-500"></div>
      <div className={showResume ? "w-150" : "w-auto"}></div>

      <Terminal
        onOpen={() => setShowResume(true)}
        onClose={() => setShowResume(false)}
        isOpen={showResume}

      // onResume={() => setShowResume(prev => !prev)}
      />
      {showResume && (
        <pre className="w-2/3 h-[80vh] bg-gray-800 text-green-300 font-mono p-6 rounded-lg ml-4 overflow-auto">
          {resumeText}
        </pre>
      )}

      {/* {activePanel === 'resume' && (
        <pre className="w-2/3 h-[80vh] bg-gray-800 text-green-300 font-mono p-6 rounded-lg ml-4 overflow-auto">
          {resumeText}
        </pre>
      )}

      {activePanel === 'ros2' && (
        <div>
          <div>ROS2!</div>
          <div>CONTROLS HERE</div>
        </div>

      )} */}

    </div>

  );
}

export default App;
