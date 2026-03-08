'use client'

import { ExternalLink } from 'lucide-react'
import { Campaign } from '@/lib/campaigns'

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 hover:border-lime-400 transition-colors duration-300 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span className={`${campaign.color} text-black px-3 py-1 rounded-full text-xs font-bold`}>
          {campaign.exchange}
        </span>
        <span className="text-gray-500 text-xs font-mono">{campaign.deadline}</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 leading-snug">
        {campaign.title}
      </h3>

      <p className="text-neon-green font-bold text-xl mb-3">
        {campaign.prizePool}
      </p>

      <p className="text-gray-400 text-sm mb-4 flex-grow">
        {campaign.description}
      </p>

      <a
        href={campaign.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-neon-green text-black font-bold py-3 px-4 rounded-lg hover:bg-lime-400 transition-colors duration-200 flex items-center justify-center gap-2 group"
      >
        Participate Now
        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}