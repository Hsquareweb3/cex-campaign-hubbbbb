'use client'

import { HypeMetrics } from '@/lib/hypeCalculator'
import { TrendingUp, Users, MessageSquare, Zap } from 'lucide-react'

interface ScoreDisplayProps {
  metrics: HypeMetrics
  projectName: string
}

export function ScoreDisplay({ metrics, projectName }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-red-500 via-pink-500 to-purple-500'
    if (score >= 70) return 'from-pink-500 via-cyan-500 to-blue-500'
    if (score >= 55) return 'from-cyan-500 via-blue-500 to-purple-500'
    if (score >= 40) return 'from-blue-500 via-purple-500 to-pink-500'
    return 'from-purple-500 via-blue-500 to-cyan-500'
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Legendary':
        return 'text-red-400'
      case 'Viral':
        return 'text-pink-400'
      case 'Popular':
        return 'text-cyan-400'
      case 'Growing':
        return 'text-blue-400'
      default:
        return 'text-purple-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className={`bg-gradient-to-br ${getScoreColor(metrics.score)} p-0.5 rounded-2xl`}>
        <div className="bg-gray-950 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">{projectName}</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="text-yellow-400" size={20} />
              <span className={`${getRatingColor(metrics.comparison.rating)} text-lg font-bold uppercase tracking-wider`}>
                {metrics.comparison.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className={`text-7xl font-black bg-gradient-to-r ${getScoreColor(metrics.score)} bg-clip-text text-transparent`}>
                {metrics.score}
              </div>
              <p className="text-gray-400 text-sm mt-2">Hype Score</p>
            </div>
            <div className="hidden sm:flex flex-col gap-4">
              <div className="text-right">
                <p className="text-gray-400 text-xs uppercase tracking-wide">Percentile</p>
                <p className="text-2xl font-bold text-cyan-400">{metrics.comparison.percentile}%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs uppercase tracking-wide">vs Average</p>
                <p className={metrics.score >= metrics.comparison.average ? 'text-2xl font-bold text-green-400' : 'text-2xl font-bold text-red-400'}>
                  {metrics.score > metrics.comparison.average ? '+' : ''}{metrics.score - metrics.comparison.average}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-cyan-400" size={24} />
            <h3 className="font-bold text-white">Followers</h3>
          </div>
          <p className="text-3xl font-bold text-cyan-400 mb-2">
            {(metrics.followers / 1000000).toFixed(1)}M
          </p>
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full"
              style={{ width: `${metrics.breakdown.followerScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Score: {metrics.breakdown.followerScore}/100</p>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-pink-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="text-pink-400" size={24} />
            <h3 className="font-bold text-white">Mentions</h3>
          </div>
          <p className="text-3xl font-bold text-pink-400 mb-2">
            {(metrics.mentions / 1000).toFixed(0)}K
          </p>
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-full"
              style={{ width: `${metrics.breakdown.mentionScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Score: {metrics.breakdown.mentionScore}/100</p>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-purple-400" size={24} />
            <h3 className="font-bold text-white">Sentiment</h3>
          </div>
          <p className="text-3xl font-bold text-purple-400 mb-2">
            {metrics.breakdown.sentimentScore}%
          </p>
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
              style={{ width: `${metrics.breakdown.sentimentScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 capitalize">{metrics.sentiment.replace('_', ' ')}</p>
        </div>
      </div>

      {/* Comparison Info */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="text-cyan-400" size={20} />
          Community Comparison
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Your Score</p>
            <p className="text-2xl font-bold text-cyan-400">{metrics.score}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Community Average</p>
            <p className="text-2xl font-bold text-gray-300">{metrics.comparison.average}</p>
          </div>
        </div>
      </div>
    </div>
  )
}