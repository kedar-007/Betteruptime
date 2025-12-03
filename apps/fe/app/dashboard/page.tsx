'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';

interface Tick {
    id: string;
    response_time_ms: number;
    status: 'Up' | 'Down';
    createdAt: string;
}

interface Stats {
    up: number;
    down: number;
    unknown: number;
    total: number;
    uptimePercent: number;
    avgResponseTime: number;
}

interface Website {
    id: string;
    url: string;
    latestStatus: 'Up' | 'Down';
    last10Ticks: Tick[];
    stats: Stats;
}

const Dashboard = () => {
    const [websites, setWebsites] = useState<Website[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        // Fetch your API data here
        axios.get(`${BACKEND_URL}/dashboard`) // replace with your endpoint
            .then(res => setWebsites(res.data.websites))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">BetterUptime Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {websites.map((website) => (
                    <div key={website.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">{website.url}</h2>
                            <span
                                className={`px-3 py-1 rounded-full text-white font-bold ${website.latestStatus === 'Up' ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            >
                                {website.latestStatus}
                            </span>
                        </div>

                        <div className="mb-3">
                            <p>Uptime: <span className="font-bold">{website.stats.uptimePercent}%</span></p>
                            <p>Avg Response: <span className="font-bold">{website.stats.avgResponseTime} ms</span></p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-2 py-1 text-left">Time</th>
                                        <th className="px-2 py-1 text-left">Status</th>
                                        <th className="px-2 py-1 text-left">Resp Time (ms)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {website.last10Ticks.map((tick) => (
                                        <tr key={tick.id} className={tick.status === 'Up' ? 'bg-green-100' : 'bg-red-100'}>
                                            <td className="px-2 py-1">{new Date(tick.createdAt).toLocaleTimeString()}</td>
                                            <td className="px-2 py-1 font-bold">{tick.status}</td>
                                            <td className="px-2 py-1">{tick.response_time_ms}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
