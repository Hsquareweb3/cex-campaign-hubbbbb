'use client'

import { useState, useMemo } from 'react'
import { Search, Zap } from 'lucide-react'
import { CampaignCard } from '@/components/CampaignCard'
import { campaigns, exchanges } from '@/lib/campaigns'

export default function Home() {
  const [selectedExchange, setSelectedExchange] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesExchange = selectedExchange === 'All' || campaign.exchange === selectedExchange
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.exchange.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesExchange && matchesSearch
    })
  }, [selectedExchange, searchQuery])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-neon-green" size={32} />
            <h1 className="text-4xl font-black bg-gradient-to-r from-neon-green to-lime-400 bg-clip-text text-transparent">
              CEX Campaign Hub
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Ongoing Rewards & Contests
          </p>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Exchange Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {exchanges.map((exchange) => (
                <button
                  key={exchange}
                  onClick={() => setSelectedExchange(exchange)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                    selectedExchange === exchange
                      ? 'bg-neon-green text-black shadow-lg shadow-neon-green/50'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {exchange}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search campaigns, titles, or exchanges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No campaigns found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6 font-semibold">
              {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Active
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-500 text-sm text-center">
            Updated in real-time • All campaigns verified • Participate responsibly
          </p>
        </div>
      </footer>
    </main>
  )
}