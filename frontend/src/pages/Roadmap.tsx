
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SkillTracks from '@/components/SkillTracks';

const Roadmap: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A2B6B]">Skill Roadmap</h1>
          <p className="text-gray-600 mt-2">
            Complete challenges to earn badges and showcase your skills
          </p>
        </div>
        
        <SkillTracks />
      </div>
    </div>
  );
};

export default Roadmap;
