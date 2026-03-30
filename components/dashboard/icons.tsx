export const Icons = {
  Flame: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),

  TrendingUp: ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    </svg>
  ),

  TrendingDown: ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
    </svg>
  ),

  Play: ({ fill = "none" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={fill} stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  )
};