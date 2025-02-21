import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignCard } from '../components/ui/campaignCard';

export default function CampaignList() {
  const navigate = useNavigate();
  
  const campaignData = [
    { name: 'Usage Paused', value: 94 },
    { name: 'Using Competitor', value: 117 },
    { name: 'Never Used', value: 68 },
  ];

  return (
    <div className="bg-gray-500 w-[500px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        <h1 className="text-xl mt-4 text-white">Your Campaigns</h1>

        <CampaignCard
          title="Autopay"
          status="Active"
          data={campaignData}
          route="/campaign-usage"
        />

        <CampaignCard
          title="Workflows"
          status="Active"
          data={campaignData}
          route="/campaign-usage"
        />

        <CampaignCard
          title="Documents"
          status="Inactive"
          data={campaignData}
          route="/campaign-usage"
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