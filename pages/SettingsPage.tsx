import React, { useState } from 'react';

type SoundName = 'None' | 'Default Beep' | 'iOS Tri-tone' | 'Bell' | 'Bubble' | 'Drops' | 'Boop' | 'Chime' | 'Wine Glass' | 'Synth';

const soundOptions: SoundName[] = ['None', 'Default Beep', 'iOS Tri-tone', 'Bell', 'Bubble', 'Drops', 'Boop', 'Chime', 'Wine Glass', 'Synth'];

const playSound = (soundName: SoundName) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const play = (freq: number, type: OscillatorType, duration: number, startTime = 0) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.value = freq;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration);
        
        oscillator.start(audioContext.currentTime + startTime);
        oscillator.stop(audioContext.currentTime + startTime + duration);
    };
    
    switch (soundName) {
        case 'Default Beep':
            play(880, 'sine', 0.1);
            break;
        case 'iOS Tri-tone':
            play(1046.50, 'sine', 0.05, 0);
            play(1318.51, 'sine', 0.05, 0.07);
            play(1567.98, 'sine', 0.05, 0.14);
            break;
        case 'Bell':
            play(1200, 'triangle', 0.2);
            play(2400, 'triangle', 0.2);
            break;
        case 'Bubble':
        case 'Drops':
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.15);
            gain.gain.setValueAtTime(0.5, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
            osc.start();
            osc.stop(audioContext.currentTime + 0.15);
            break;
        case 'Boop':
             play(440, 'square', 0.08);
             break;
        case 'Chime':
             play(1500, 'sine', 0.1);
             play(2000, 'sine', 0.1);
             break;
        case 'Wine Glass':
             play(700, 'triangle', 0.5);
             play(1400, 'triangle', 0.5);
             break;
         case 'Synth':
            play(523.25, 'sawtooth', 0.15); // C5
            break;
        default:
            break;
    }
};

const DayRow: React.FC<{ day: string, workingHours: any, handleToggle: any, handleTimeChange: any }> = ({ day, workingHours, handleToggle, handleTimeChange }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700 w-24">{day}</span>
        <label htmlFor={`toggle-${day}`} className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id={`toggle-${day}`} className="sr-only" checked={workingHours[day].enabled} onChange={() => handleToggle(day)} />
                <div className={`block w-14 h-8 rounded-full ${workingHours[day].enabled ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${workingHours[day].enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
        </label>
        <div className={`flex items-center space-x-2 ${!workingHours[day].enabled ? 'opacity-50' : ''}`}>
            <input 
                type="time" 
                value={workingHours[day].start}
                onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                disabled={!workingHours[day].enabled}
                className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" 
            />
            <span>-</span>
            <input 
                type="time" 
                value={workingHours[day].end}
                onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                disabled={!workingHours[day].enabled}
                className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" 
            />
        </div>
    </div>
);

const SettingsPage: React.FC = () => {
    const [selectedSound, setSelectedSound] = useState<SoundName>('Default Beep');
    const [workingHours, setWorkingHours] = useState({
        Monday: { enabled: true, start: '09:00', end: '17:00' },
        Tuesday: { enabled: true, start: '09:00', end: '17:00' },
        Wednesday: { enabled: true, start: '09:00', end: '17:00' },
        Thursday: { enabled: true, start: '09:00', end: '17:00' },
        Friday: { enabled: true, start: '09:00', end: '17:00' },
        Saturday: { enabled: false, start: '10:00', end: '14:00' },
        Sunday: { enabled: false, start: '10:00', end: '14:00' },
    });

    const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sound = e.target.value as SoundName;
        setSelectedSound(sound);
        playSound(sound);
    };

    const handleToggle = (day: string) => {
        setWorkingHours(prev => ({
            ...prev,
            [day]: { ...prev[day as keyof typeof prev], enabled: !prev[day as keyof typeof prev].enabled }
        }));
    };
    
    const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
         setWorkingHours(prev => ({
            ...prev,
            [day]: { ...prev[day as keyof typeof prev], [type]: value }
        }));
    };


    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* Widget Settings */}
            <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-dark border-b pb-3 mb-6">Widget Settings</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label htmlFor="widget-color" className="text-sm font-medium text-gray-700">Primary Color</label>
                        <input id="widget-color" type="color" defaultValue="#4F46E5" className="h-8 w-14 border border-gray-300 rounded-md" />
                    </div>
                     <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Position on Site</label>
                        <div className="flex items-center space-x-4">
                             <label className="flex items-center">
                                <input type="radio" name="position" value="right" className="h-4 w-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
                                <span className="ml-2 text-sm">Right</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="position" value="left" className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                                <span className="ml-2 text-sm">Left</span>
                            </label>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="offline-message" className="block text-sm font-medium text-gray-700 mb-1">Offline Message</label>
                        <textarea id="offline-message" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" defaultValue="Sorry we're not online. Leave a message and we'll get back to you!"></textarea>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-dark border-b pb-3 mb-6">Notifications</h2>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label htmlFor="message-sound" className="text-sm font-medium text-gray-700">Message Sound</label>
                         <select id="message-sound" value={selectedSound} onChange={handleSoundChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm">
                            {soundOptions.map(sound => <option key={sound} value={sound}>{sound}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-dark border-b pb-3 mb-6">Working Hours</h2>
                <p className="text-sm text-gray-600 mb-4">Set the hours when your chat widget will appear as "Online".</p>
                <div className="space-y-2">
                    {Object.keys(workingHours).map(day => (
                        <DayRow 
                            key={day}
                            day={day}
                            workingHours={workingHours}
                            handleToggle={handleToggle}
                            handleTimeChange={handleTimeChange}
                        />
                    ))}
                </div>
            </div>

             <div className="pt-2 flex justify-end">
                <button type="submit" className="flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Save All Settings
                </button>
            </div>

        </div>
    );
};

export default SettingsPage;
