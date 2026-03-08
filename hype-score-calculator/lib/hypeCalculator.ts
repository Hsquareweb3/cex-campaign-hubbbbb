export interface HypeMetrics {
  followers: number
  mentions: number
  sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative'
  score: number
  breakdown: {
    followerScore: number
    mentionScore: number
    sentimentScore: number
  }
  comparison: {
    average: number
    percentile: number
    rating: 'Emerging' | 'Growing' | 'Popular' | 'Viral' | 'Legendary'
  }
}

export interface ProjectData {
  name: string
  handle: string
  metrics: HypeMetrics
}

// Mock project data
export const mockProjects: Record<string, Partial<HypeMetrics>> = {
  bitcoin: { followers: 8500000, mentions: 125000, sentiment: 'positive' },
  ethereum: { followers: 4200000, mentions: 98000, sentiment: 'positive' },
  solana: { followers: 2100000, mentions: 65000, sentiment: 'positive' },
  doge: { followers: 3800000, mentions: 72000, sentiment: 'neutral' },
  xrp: { followers: 1900000, mentions: 45000, sentiment: 'neutral' },
  cardano: { followers: 2500000, mentions: 52000, sentiment: 'positive' },
  polkadot: { followers: 1800000, mentions: 38000, sentiment: 'positive' },
  avalanche: { followers: 1200000, mentions: 28000, sentiment: 'positive' },
  polygon: { followers: 950000, mentions: 22000, sentiment: 'positive' },
  arbitrum: { followers: 450000, mentions: 12000, sentiment: 'positive' },
}

const SENTIMENT_SCORES: Record<string, number> = {
  very_positive: 100,
  positive: 75,
  neutral: 50,
  negative: 25,
}

export function calculateHypeScore(
  followers: number,
  mentions: number,
  sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative'
): HypeMetrics {
  // Normalize followers (0-100 scale, cap at 10M)
  const maxFollowers = 10000000
  const followerScore = Math.min(100, (followers / maxFollowers) * 100)

  // Normalize mentions (0-100 scale, cap at 150K)
  const maxMentions = 150000
  const mentionScore = Math.min(100, (mentions / maxMentions) * 100)

  // Sentiment score (pre-mapped)
  const sentimentScore = SENTIMENT_SCORES[sentiment]

  // Weighted average: 40% followers, 35% mentions, 25% sentiment
  const score = Math.round(
    followerScore * 0.4 + mentionScore * 0.35 + sentimentScore * 0.25
  )

  // Calculate comparison to average
  const averageScore = 52
  const percentile = Math.min(
    100,
    Math.round((score / 100) * 100)
  )

  // Determine rating
  let rating: 'Emerging' | 'Growing' | 'Popular' | 'Viral' | 'Legendary'
  if (score >= 85) rating = 'Legendary'
  else if (score >= 70) rating = 'Viral'
  else if (score >= 55) rating = 'Popular'
  else if (score >= 40) rating = 'Growing'
  else rating = 'Emerging'

  return {
    followers,
    mentions,
    sentiment,
    score,
    breakdown: {
      followerScore: Math.round(followerScore),
      mentionScore: Math.round(mentionScore),
      sentimentScore,
    },
    comparison: {
      average: averageScore,
      percentile,
      rating,
    },
  }
}

export function getMockProjectMetrics(query: string): HypeMetrics | null {
  const key = query.toLowerCase().replace('@', '').trim()
  const mockData = mockProjects[key]

  if (!mockData) return null

  return calculateHypeScore(
    mockData.followers || 100000,
    mockData.mentions || 5000,
    mockData.sentiment || 'neutral'
  )
}

export function generateShareableText(projectName: string, metrics: HypeMetrics): string {
  return `🚀 ${projectName} Community Hype Score: ${metrics.score}/100 (${metrics.comparison.rating})\n\nFollowers: ${(metrics.followers / 1000000).toFixed(1)}M | Mentions: ${(metrics.mentions / 1000).toFixed(0)}K | Sentiment: ${metrics.sentiment.replace('_', ' ')}\n\nCheck your project at Hype Score Calculator 📊`
}