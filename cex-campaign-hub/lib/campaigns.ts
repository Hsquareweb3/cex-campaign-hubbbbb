export interface Campaign {
  id: string
  exchange: string
  title: string
  prizePool: string
  deadline: string
  description: string
  link: string
  color: string
}

export const campaigns: Campaign[] = [
  {
    id: '1',
    exchange: 'Binance',
    title: 'February Trading Competition',
    prizePool: '$50,000 USDT',
    deadline: 'Ends 28 Feb 2026',
    description: 'Trade any crypto pair to compete for daily rewards and prizes.',
    link: 'https://www.binance.com/en/activity/trading-competition',
    color: 'bg-yellow-500',
  },
  {
    id: '2',
    exchange: 'OKX',
    title: 'Sign-up Bonus Campaign',
    prizePool: '$100 USDT',
    deadline: 'Ends 15 Mar 2026',
    description: 'New users get instant bonus after completing verification.',
    link: 'https://www.okx.com/en/join',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    exchange: 'Bybit',
    title: 'Perpetual Trading Rewards',
    prizePool: '$75,000 USDT',
    deadline: 'Ends 10 Mar 2026',
    description: 'Earn rewards based on trading volume on perpetual contracts.',
    link: 'https://www.bybit.com/en-US/',
    color: 'bg-purple-500',
  },
  {
    id: '4',
    exchange: 'Gate.io',
    title: 'Spot Trading Challenge',
    prizePool: '$30,000 USDT',
    deadline: 'Ends 25 Feb 2026',
    description: 'Daily leaderboard rankings with real-time prize distributions.',
    link: 'https://www.gate.io/en',
    color: 'bg-cyan-500',
  },
  {
    id: '5',
    exchange: 'KuCoin',
    title: 'Bounty Program - NFT Rewards',
    prizePool: '5,000 NFTs',
    deadline: 'Ends 31 Mar 2026',
    description: 'Complete tasks and social missions to earn exclusive NFTs.',
    link: 'https://www.kucoin.com/en',
    color: 'bg-green-500',
  },
  {
    id: '6',
    exchange: 'Binance',
    title: 'Futures Trading Leaderboard',
    prizePool: '$200,000 USDT',
    deadline: 'Ends 28 Feb 2026',
    description: 'Compete on futures markets for weekly and monthly prizes.',
    link: 'https://www.binance.com/en/activity/trading-competition',
    color: 'bg-yellow-500',
  },
  {
    id: '7',
    exchange: 'Bybit',
    title: 'Referral Campaign Bonus',
    prizePool: 'Up to $500 per referral',
    deadline: 'Ongoing',
    description: 'Earn commissions from every friend you invite to trade.',
    link: 'https://www.bybit.com/en-US/user/referral',
    color: 'bg-purple-500',
  },
  {
    id: '8',
    exchange: 'OKX',
    title: 'Copy Trading Contest',
    prizePool: '$25,000 USDT',
    deadline: 'Ends 20 Mar 2026',
    description: 'Best copy traders win prizes based on ROI and followers.',
    link: 'https://www.okx.com/en/copy-trading',
    color: 'bg-blue-500',
  },
  {
    id: '9',
    exchange: 'Gate.io',
    title: 'Liquidity Provider Rewards',
    prizePool: '$45,000 USDT',
    deadline: 'Ends 31 Mar 2026',
    description: 'Earn LP rewards and trading fee discounts on select pairs.',
    link: 'https://www.gate.io/en',
    color: 'bg-cyan-500',
  },
  {
    id: '10',
    exchange: 'KuCoin',
    title: 'Token Staking Campaign',
    prizePool: '500,000 KCS tokens',
    deadline: 'Ends 15 Apr 2026',
    description: 'Lock tokens to earn APY and participation rewards.',
    link: 'https://www.kucoin.com/en/earn',
    color: 'bg-green-500',
  },
]

export const exchanges = ['All', 'Binance', 'OKX', 'Bybit', 'Gate.io', 'KuCoin']