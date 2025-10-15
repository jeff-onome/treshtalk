import React, { useState } from 'react';
import { CloseIcon, MapIcon } from '../components/icons';

const mockVisitors = [
    { id: 1, name: 'John Doe', location: 'New York, USA', lastSeen: '2 minutes ago', status: 'Online', avatar: 'https://picsum.photos/seed/john/100/100' },
    { id: 2, name: 'Jane Smith', location: 'London, UK', lastSeen: '15 minutes ago', status: 'Online', avatar: 'https://picsum.photos/seed/jane/100/100' },
    { id: 3, name: 'Carlos Garcia', location: 'Madrid, Spain', lastSeen: '1 hour ago', status: 'Offline', avatar: 'https://picsum.photos/seed/carlos/100/100' },
    { id: 4, name: 'Aisha Khan', location: 'Dubai, UAE', lastSeen: '5 hours ago', status: 'Offline', avatar: 'https://picsum.photos/seed/aisha/100/100' },
    { id: 5, name: 'Yuki Tanaka', location: 'Tokyo, Japan', lastSeen: '1 day ago', status: 'Offline', avatar: 'https://picsum.photos/seed/yuki/100/100' },
];

const MapModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-dark">Live Visitors Map</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-1 p-2 bg-gray-100">
                 <img src="https://picsum.photos/seed/worldmap/1200/800" className="w-full h-full object-cover rounded-md" alt="World map of visitors" />
            </div>
             <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
                This is a simulated real-time map of your website visitors.
            </div>
        </div>
    </div>
);


const VisitorsPage: React.FC = () => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    return (
        <>
            {isMapOpen && <MapModal onClose={() => setIsMapOpen(false)} />}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-dark">Live Visitors</h1>
                    <button onClick={() => setIsMapOpen(true)} className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
                        <MapIcon className="h-5 w-5" />
                        View Map
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockVisitors.map((visitor) => (
                                    <tr key={visitor.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={visitor.avatar} alt={visitor.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${visitor.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {visitor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.lastSeen}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisitorsPage;