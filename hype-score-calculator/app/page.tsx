'use client'

import { useState } from 'react'
import { Search, Share2, Copy, Zap } from 'lucide-react'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { 
  calculateHypeScore, 
  getMockProjectMetrics, 
  mockProjects,
  generateShareableText 
} from '@/lib/hypeCalculator'
import type { HypeMetrics } from '@/lib/hypeCalculator'

export default function Home() {
  const [query, setQuery] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')
  const [metrics, setMetrics] = useState<HypeMetrics | null>(null)
  const [copied, setCopied] = useState(false)
  const [useCustom, setUseCustom] = useState(false)
  const [customFollowers, setCustomFollowers] = useState<string>('')
  const [customMentions, setCustomMentions] = useState<string>('')
  const [customSentiment, setCustomSentiment] = useState<'very_positive' | 'positive' | 'neutral' | 'negative'>('positive')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    if (useCustom) {
      if (!customFollowers || !customMentions) {
        alert('Please fill in all custom fields')
        return
      }
      const newMetrics = calculateHypeScore(
        parseInt(customFollowers) || 0,
        parseInt(customMentions) || 0,
        customSentiment
      )
      setMetrics(newMetrics)
      setProjectName(query)
    } else {
      const projectMetrics = getMockProjectMetrics(query)
      if (projectMetrics) {
        setMetrics(projectMetrics)
        setProjectName(query.replace('@', ''))
      } else {
        // Generate random metrics for unknown projects
        const randomFollowers = Math.floor(Math.random() * 5000000) + 100000
        const randomMentions = Math.floor(Math.random() * 80000) + 5000
        const sentiments: Array<'very_positive' | 'positive' | 'neutral' | 'negative'> = ['very_positive', 'positive', 'neutral', 'negative']
        const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
        
        const newMetrics = calculateHypeScore(randomFollowers, randomMentions, randomSentiment)
        setMetrics(newMetrics)
        setProjectName(query.replace('@', ''))
      }
    }
  }

  const handleShare = () => {
    if (!metrics) return
    const shareText = generateShareableText(projectName, metrics)
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleQuickSelect = (project: string) => {
    setQuery(project)
    setUseCustom(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-gradient-to-b from-purple-900/20 to-transparent sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-pink-500" size={32} />
            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Hype Score Calculator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Measure community momentum for Web3 projects
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-4 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Enter project name or @twitter handle..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-950 border border-purple-800/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200 text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Calculate
              </button>
            </div>

            {/* Toggle Custom Mode */}
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={useCustom}
                onChange={(e) => setUseCustom(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-800 border-gray-600 cursor-pointer"
              />
              <span className="text-sm">Use Custom Metrics</span>
            </label>
          </form>

          {/* Custom Metrics Input */}
          {useCustom && (
            <div className="bg-gray-950 border border-purple-800/30 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-white mb-4">Enter Custom Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Followers</label>
                  <input
                    type="number"
                    value={customFollowers}
                    onChange={(e) => setCustomFollowers(e.target.value)}
                    placeholder="e.g., 1000000"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Mentions (24h)</label>
                  <input
                    type="number"
                    value={customMentions}
                    onChange={(e) => setCustomMentions(e.target.value)}
                    placeholder="e.g., 50000"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sentiment</label>
                  <select
                    value={customSentiment}
                    onChange={(e) => setCustomSentiment(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="very_positive">Very Positive</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Popular Projects */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">Try Popular Projects:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(mockProjects).map((project) => (
                <button
                  key={project}
                  onClick={() => handleQuickSelect(project)}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-cyan-500/50 rounded-lg text-sm font-medium transition-all duration-200 capitalize"
                >
                  {project}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {metrics && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-pink-500/50 rounded-lg px-4 py-2 font-medium transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Copy size={18} className="text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 size={18} />
                    Share Result
                  </>
                )}
              </button>
            </div>

            <ScoreDisplay metrics={metrics} projectName={projectName} />
          </div>
        )}

        {/* Empty State */}
        {!metrics && (
          <div className="text-center py-16">
            <Zap className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400 text-lg">
              Enter a project name to calculate its hype score
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 bg-gradient-to-t from-purple-900/10 to-transparent mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-500 text-sm text-center">
            Hype scores are calculated based on community metrics • For entertainment purposes
          </p>
        </div>
      </footer>
    </main>
  )
}