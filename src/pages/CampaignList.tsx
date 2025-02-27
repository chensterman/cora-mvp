import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignCard } from '../components/ui/campaignCard';
import { UsageCard } from '../components/ui/usageCard';

export default function CampaignList() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-500 w-[500px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        <h1 className="text-xl mt-4 text-white">Your Revenue Campaigns</h1>

        <CampaignCard
          title="Feature Usage"
          active={true}
          route="/campaign-list-sub/Feature Usage"
        />

        <CampaignCard
          title="Products"
          active={true}
          route="/campaign-list-sub/Products"
        />

        <CampaignCard
          title="Switch to New Feature"
          active={false}
          route="/campaign-list-sub/Switch to New Feature"
        />

        <CampaignCard
          title="Leadership Change"
          active={true}
          route="/campaign-list-sub/Leadership Change"
        />

        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-500"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}