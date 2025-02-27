import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CampaignCard } from '../components/ui/campaignCard';

type CampaignSub = {
  title: string;
  active: boolean;
  data?: { name: string; value: number; }[];
};

export default function CampaignListSub() {
  const navigate = useNavigate();
  const { type } = useParams();

  const featureData = [
    { name: 'Usage Paused', value: 94 },
    { name: 'Never Used', value: 68 },
    { name: 'Active', value: 117 },
  ];

  const productData = [
    { name: 'Rippling', value: 30 },
    { name: 'Bamboo', value: 24 },
    { name: 'Workday', value: 17 },
    { name: 'Not Using', value: 10 },
  ];

  const campaignTypes = [
    {
      title: 'Feature Usage',
      campaignSubs: [
        {
          title: 'Autopay',
          data: featureData,
          active: true,
        },
        {
          title: 'Workflows',
          data: featureData,
          active: false,
        },
        {
          title: 'Documents',
          data: featureData,
          active: false,
        },
      ] as CampaignSub[]
    },
    {
      title: 'Products',
      campaignSubs: [
        {
          title: 'HRIS',
          data: productData,
          active: true,
        },
        {
          title: 'Payroll',
          data: productData,
          active: false,
        },
        {
          title: 'Contractor',
          data: productData,
          active: false,
        },
      ] as CampaignSub[]
    },
    {
      title: 'Switch to New Feature',
      campaignSubs: []
    },
    {
      title: 'Leadership Change',
      campaignSubs: [
        {
          title: 'Champion / Senior Leader',
          active: true,
        },
        {
          title: 'Management',
          active: false,
        },
      ] as CampaignSub[]
    },
  ];

  return (
    <div className="bg-gray-500 w-[500px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        <h1 className="text-xl mt-4 text-white">Revenue Campaign - {type}</h1>

        {campaignTypes
          .find(campaign => campaign.title === type)
          ?.campaignSubs.map((sub, index) => (
            <CampaignCard
              key={index}
              title={sub.title}
              active={sub.active}
              data={sub.data}
              route={`/campaign-list-sub-metric/${type}/${sub.title}`}
            />
          ))}

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