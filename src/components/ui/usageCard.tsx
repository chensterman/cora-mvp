import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';

interface UsageCardProps {
  count: number;
  title: string;
  route: string;
  countColor?: string;
  buttonText?: string;
}

export function UsageCard({
  count,
  title,
  route,
  buttonText = 'Outreach'
}: UsageCardProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div className="flex items-center rounded-lg bg-black border border-gray-500 shadow-sm w-full my-2">
      <div className={`px-4 h-8 rounded-full bg-white m-4 flex items-center text-black text-sm font-medium`}>
        {count}
      </div>
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
