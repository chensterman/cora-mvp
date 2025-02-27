import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';

interface UsageCardProps {
  title: string;
  route: string;
  count?: number;
  countColor?: string;
  buttonText?: string;
}

export function UsageCard({
  title,
  route,
  count = -1,
  buttonText = 'Outreach'
}: UsageCardProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div className="flex items-center rounded-xl bg-black border border-gray-500 shadow-sm w-full my-2">
      {count >= 0 && (
        <div className={`px-4 h-8 rounded-full bg-white m-4 flex items-center text-black text-sm font-medium`}>
          {count}
        </div>
      )}
      <h1 className="text-lg text-white p-2">{title}</h1>
      <div className="flex-1"/>
      <Button 
        onClick={handleClick}
        className="m-4"
        variant="default"
      >
        {buttonText}
      </Button>
    </div>
  );
}
