import Terminal from "./components/Terminal";
import { useState } from 'react'
import resumeText from './text/resume.txt?raw'


function App() {
  const [selectPanel, setSelectPanel] = useState<string | null>(null)
  // const [activePanel, setActivePanel] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex transition-all duration-500"></div>
       <div className={selectPanel ? "w-150" : "w-auto"}></div>

      <Terminal
        panelSelect={setSelectPanel}
        activePanel={selectPanel !== null}
        // onOpen={() => setShowResume(true)}
        // onClose={() => setShowResume(false)}
        // isOpen={showResume}

      // onResume={() => setShowResume(prev => !prev)}
      />
      {/* {showResume && (
        <pre className="w-2/3 h-[80vh] bg-gray-800 text-green-300 font-mono p-6 rounded-lg ml-4 overflow-auto">
          {resumeText}
        </pre>
      )} */}

      { selectPanel === 'resume' && (
        <pre className="w-2/3 h-[80vh] bg-gray-800 text-green-300 font-mono p-6 rounded-lg ml-4 overflow-auto">
          {resumeText}
        </pre>
      )}

      { selectPanel === 'ros2' && (
        <div className='w-2/3 h-[80vh] p-6 rounded-lg ml-4 text-green-800'>
          <div >ROS2!</div>
          <div>CONTROLS HERE</div>
        </div>

      )}

    </div>

  );
}

export default App;
