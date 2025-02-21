import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UsageCard } from '../components/ui/usageCard';

export default function CampaignUsage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-500 w-[500px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        <h1 className="text-xl mt-4 text-white">Usage Campaign - Autopay</h1>

        <UsageCard
          count={94}
          title="Usage Paused"
          route="/campaign-setup/usage-stopped"
        />

        <UsageCard
          count={117}
          title="Using Competitor"
          route="/campaign-setup/competitor"
        />

        <UsageCard
          count={68}
          title="Never Used"
          route="/campaign-setup/manual"
        />

        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-500"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
