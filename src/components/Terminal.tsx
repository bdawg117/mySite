import { useEffect, useState } from 'react';

import { useRef } from 'react';

// Static output for each print command — add new commands here
const commandOutputs: Record<string, string[]> = {

    // skill list grouped by category
    skills: [
        'Languages:   Python  |  C/C++  |  Java',
        'ML/AI:       TensorFlow  |  CUDA  |  Scikit-Learn  |  OpenCV  |  ROS2',
        'Databases:   PostgreSQL  |  MySQL',
        'Frontend:    React.js  |  TypeScript  |  GraphQL',
        'Backend:     REST API  |  Node.js  |  Temporal',
        'DevOps:      Docker  |  AWS  |  GitHub',
        'Concepts:    OOP  |  System Architecture  |  CaaS  |  IaaS',
    ],

    // lists available commands
    help: [
        'Available commands:',
        '  skills   → tech stack',
        '  ls       → projects',
        '  help     → this menu',
        '  clear    → clear screen',
    ],

    // project list
    ls: [
        'A.R.I.A: Autonomous Reactive Intelligent Assistant'
    ],

    resume: [
        "Type 'close' to close resume"
    ],
    close: [
        ''
    ],
    projects: [
        '──────────────────────────────────────────────────',
        '  A.R.I.A. — Autonomous Reactive Intelligent Assistant',
        '──────────────────────────────────────────────────',
        '  › Fully offline local AI assistant integrated with ROS2,',
        '    enabling voice-controlled robot navigation, object',
        '    detection, and task execution without cloud dependency',
        '  › On-device LLM pipelines for natural language understanding,',
        '    achieving low-latency decision-making optimized for',
        '    Raspberry Pi and accelerated with NVIDIA RTX hardware',
        '  › Integrated Vosk (STT) and Piper (TTS) with ROS2, creating',
        '    a full voice interaction loop for real-time perception',
        '  › Modular systems for command processing and SLAM, enabling',
        '    flexible composition of autonomy and interaction',
        '',
        '──────────────────────────────────────────────────',
        '  Age Detection Model',
        '──────────────────────────────────────────────────',
        '  › Built a binary audio classifier using TensorFlow/Keras to',
        '    distinguish adult vs. child speakers, designed to restrict',
        '    unauthorized voice commands in AI assistant contexts',
        '  › Engineered audio features by extracting 13-dimensional MFCC',
        '    representations from raw audio using librosa, capturing',
        '    spectral and timbral speech patterns across wav, flac, mp3',
        '  › Designed and trained a 3-layer dense neural network',
        '    (128→64→1) achieving binary classification',
        '  › Built a reusable inference pipeline, exporting the trained',
        '    model and fitted scaler for deployment',
    ],

    alreadyClosed: [
        'Resume is closed, open it with "resume"'
    ]
}

function Terminal({ onOpen, onClose, isOpen }: { onOpen: () => void, onClose: () => void, isOpen: boolean }) {

    const bottomRef = useRef<HTMLDivElement>(null)
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<{ cmd: string, output: string[] }[]>([])
    const commands = ['ls', 'skills', 'help', 'clear']
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    })

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

        if (e.key === 'Enter') {
            if (input === 'clear') {
                setHistory([])
            } else if (input === 'resume') {
                onOpen()
            } else if (input === 'close') {
                if (isOpen === true) {
                    onClose()
                } else {
                    setHistory(prev => [...prev, { cmd: input, output: runCommand('alreadyClosed') }])
                    setInput('')
                    return
                }

            }


            setHistory(prev => [...prev, { cmd: input, output: runCommand(input) }])
            setInput('')
        }
    }

    function runCommand(e: string): string[] {
        // if (!commands.includes(e)) {
        // return `${e} is not a valid command`
        // } else if (e === 'help') {
        // return 'Here is a list of available commands: '
        // 
        // } else {
        // 
        // return e
        // }

        if (e === 'clear') return []
        if (!commandOutputs[e]) return [`${e} is not a valid command`]
        return commandOutputs[e]

    }


    return (
        <div className="">
            <div className="bg-gray-800 w-150 h-[65vh] text-green-300 rounded-t-lg border-10 border-gray-300 border-b-2 overflow-auto"
                onClick={() => inputRef.current?.focus()}>
                {/* 
                {...history.map((line, index) => (
                    <div key={index}>guest@you: {runCommand(line)}</div>
                ))} */}
                {history.map((entry, index) => (
                    <div key={index}>
                        <div>guest@you: {entry.cmd}</div>
                        {entry.output.map((line, j) => (
                            <div key={j}>{line}</div>
                        ))}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="bg-gray-500 w-150 h-10 rounded-b-lg px-4 py-1 border-10 border-gray-300 border-t-0 flex-1 items-center">
                <span className="text-green-300 flex-1 font-mono">
                    guest@you: </span>
                <input className="text-green-300 border-none outline-none" type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                ></input>

            </div>
        </div>
    );

}

export default Terminal;