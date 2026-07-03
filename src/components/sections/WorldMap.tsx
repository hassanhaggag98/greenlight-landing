import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Country } from '@/types/public'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface MapNode {
  id: string
  x: number
  y: number
  label: string
  flag?: string
  isHub?: boolean
}

interface WorldMapProps {
  countries?: Country[]
  className?: string
}

const VIEW_W = 1000
const VIEW_H = 520

const HUB_ID = 'egypt'

const NODE_DEFS = [
  { id: HUB_ID, x: 542, y: 278, labelKey: 'home.countryEgypt', flag: '🇪🇬', isHub: true },
  { id: 'uae', x: 592, y: 252, labelKey: 'home.countryUae', flag: '🇦🇪' },
  { id: 'sa', x: 568, y: 242, labelKey: 'home.countrySa', flag: '🇸🇦' },
  { id: 'usa', x: 218, y: 228, labelKey: 'home.countryUsa', flag: '🇺🇸' },
  { id: 'uk', x: 488, y: 178, labelKey: 'home.countryUk', flag: '🇬🇧' },
  { id: 'sg', x: 762, y: 318, labelKey: 'home.countrySg', flag: '🇸🇬' },
  { id: 'au', x: 878, y: 398, labelKey: 'home.countryAu', flag: '🇦🇺' },
  { id: 'de', x: 512, y: 188, labelKey: 'home.countryDe', flag: '🇩🇪' },
] as const

const CONTINENT_DOTS: Array<[number, number]> = [
  [180, 160], [210, 200], [240, 260], [190, 320], [260, 380], [320, 340],
  [380, 200], [420, 240], [460, 280], [500, 220], [540, 260], [580, 230],
  [620, 270], [660, 250], [700, 290], [740, 260], [780, 300], [820, 280],
  [860, 340], [780, 380], [720, 400], [640, 360], [560, 320], [480, 300],
  [400, 280], [340, 300], [280, 280], [220, 240], [160, 280], [140, 220],
  [300, 180], [360, 160], [440, 170], [520, 150], [600, 170], [680, 190],
  [760, 210], [840, 230], [900, 260], [920, 320], [880, 360], [800, 400],
  [700, 420], [600, 400], [500, 380], [400, 360], [300, 340], [200, 300],
]

function buildNodes(countries: Country[] | undefined, t: (key: string) => string): MapNode[] {
  const defaults = NODE_DEFS.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    label: t(node.labelKey),
    flag: node.flag,
    isHub: 'isHub' in node ? node.isHub : false,
  }))

  if (!countries?.length) return defaults

  const hub = { ...defaults[0]!, label: countries[0]?.name ?? t('home.countryEgypt') }
  const positions = NODE_DEFS.slice(1)
  const rest = countries.slice(1, 9).map((c, i) => ({
    id: String(c.id ?? i),
    x: positions[i]?.x ?? 200 + i * 80,
    y: positions[i]?.y ?? 200 + (i % 3) * 60,
    label: c.name,
    flag: positions[i]?.flag,
  }))

  return [hub, ...rest]
}

function curvedPath(from: MapNode, to: MapNode, bend = 0.22): string {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cx = mx - dy * bend
  const cy = my + dx * bend
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

function toPercent(x: number, y: number) {
  return { left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }
}

function RoutePath({
  d,
  highlighted,
  showPacket,
  dimmed,
  reduced,
  delay,
}: {
  d: string
  highlighted: boolean
  showPacket: boolean
  dimmed: boolean
  reduced: boolean
  delay: number
}) {
  const stroke = highlighted
    ? 'url(#routeActive)'
    : dimmed
      ? 'rgba(110, 207, 152, 0.12)'
      : 'rgba(110, 207, 152, 0.42)'

  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={highlighted ? 2.6 : 1.5}
        strokeLinecap="round"
        strokeDasharray={highlighted ? 'none' : '5 4'}
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: dimmed ? 0.3 : 1 }}
        transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : delay, ease: 'easeOut' }}
      />
      {highlighted && !reduced && (
        <motion.path
          d={d}
          fill="none"
          stroke="rgba(110, 207, 152, 0.22)"
          strokeWidth={9}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      )}
      {showPacket && !reduced && (
        <>
          <motion.circle
            r={5}
            fill="#6ecf98"
            stroke="#0a1628"
            strokeWidth={2}
            style={{ offsetPath: `path('${d}')`, offsetRotate: '0deg' }}
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            r={3.5}
            fill="#d4af37"
            style={{ offsetPath: `path('${d}')`, offsetRotate: '0deg' }}
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: 1.3 }}
          />
        </>
      )}
    </>
  )
}

export function WorldMap({ countries, className }: WorldMapProps) {
  const { t } = useTranslation()
  const nodes = useMemo(() => buildNodes(countries, t), [countries, t])
  const hub = nodes[0]!
  const destinations = nodes.slice(1)
  const [activeId, setActiveId] = useState(hub.id)
  const reduced = prefersReducedMotion()

  const activeNode = nodes.find((n) => n.id === activeId) ?? hub

  return (
    <div className={cn('space-y-6', className)}>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: 'easeOut' }}
        className="relative aspect-[25/13] max-h-[320px] min-h-[210px] w-full overflow-hidden rounded-2xl border map-canvas sm:min-h-[260px] sm:max-h-[420px] lg:max-h-[520px]"
      >
        {/* Ambient glows — always on dark canvas */}
        <div
          className="pointer-events-none absolute -start-20 -top-20 size-72 rounded-full bg-[#6ecf98]/12 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -end-16 size-64 rounded-full bg-[#d4af37]/10 blur-3xl"
          aria-hidden
        />

        {/* Grid */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 size-full text-white/12"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[140, 220, 300, 380].map((y) => (
            <ellipse
              key={`lat-${y}`}
              cx={VIEW_W / 2}
              cy={y}
              rx={VIEW_W * 0.46}
              ry={18 + (y - 220) * 0.08}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {[200, 400, 600, 800].map((x) => (
            <path
              key={`lng-${x}`}
              d={`M ${x} 60 Q ${x + (x - VIEW_W / 2) * 0.08} ${VIEW_H / 2} ${x} ${VIEW_H - 60}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Network SVG */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="routeActive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#6ecf98" />
              <stop offset="100%" stopColor="#3cb371" />
            </linearGradient>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {CONTINENT_DOTS.map(([x, y], i) => (
            <circle key={`dot-${i}`} cx={x} cy={y} r={2.2} fill="rgba(255,255,255,0.18)" />
          ))}

          {destinations.map((node, i) => {
            const d = curvedPath(hub, node)
            const isActive = activeId === node.id
            const highlighted = activeId === hub.id || isActive
            const dimmed = activeId !== hub.id && !isActive
            return (
              <RoutePath
                key={node.id}
                d={d}
                highlighted={highlighted}
                showPacket={isActive}
                dimmed={dimmed}
                reduced={reduced}
                delay={0.2 + i * 0.12}
              />
            )
          })}

          {!reduced && (
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r={36}
              fill="url(#hubGlow)"
              animate={{ r: [32, 46, 32], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </svg>

        {/* Interactive nodes */}
        {nodes.map((node, i) => {
          const pos = toPercent(node.x, node.y)
          const isActive = activeId === node.id
          const isHub = node.isHub

          return (
            <motion.button
              key={node.id}
              type="button"
              className="absolute z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ecf98] sm:size-8"
              style={pos}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.35 + i * 0.08 }}
              whileHover={reduced ? undefined : { scale: 1.12 }}
              whileTap={reduced ? undefined : { scale: 0.9 }}
              onClick={() => setActiveId(node.id)}
              aria-label={node.label}
              aria-pressed={isActive}
            >
              <span className="relative flex items-center justify-center">
                {!reduced && isActive && (
                  <span
                    className={cn(
                      'absolute -inset-2.5 rounded-full opacity-70',
                      isHub ? 'animate-ping bg-[#d4af37]/50' : 'animate-ping bg-[#6ecf98]/40',
                    )}
                  />
                )}
                <span
                  className={cn(
                    'relative flex items-center justify-center rounded-full border-2 border-white/90 shadow-[0_0_8px_rgba(110,207,152,0.4)] transition-all duration-300',
                    isHub
                      ? 'size-[22px] bg-[#d4af37] sm:size-6'
                      : cn(
                          'size-3.5 bg-[#3cb371]',
                          isActive && 'size-[18px] bg-[#6ecf98] ring-4 ring-[#6ecf98]/30',
                        ),
                  )}
                />
              </span>
            </motion.button>
          )
        })}

        {/* Tooltip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: 'easeOut' }}
            className="pointer-events-none absolute z-20 max-w-[min(100%,14rem)] -translate-x-1/2 px-2 sm:max-w-none sm:px-0"
            style={{
              left: `${Math.min(Math.max((activeNode.x / VIEW_W) * 100, 22), 78)}%`,
              top: `${Math.max((activeNode.y / VIEW_H) * 100 - 14, 2)}%`,
            }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#122640]/95 px-2.5 py-1.5 text-center shadow-xl backdrop-blur-md sm:max-w-none sm:px-3 sm:py-2 sm:text-start">
              {activeNode.flag && <span className="shrink-0 text-base leading-none">{activeNode.flag}</span>}
              <div className="min-w-0">
                <p className="text-xs font-bold leading-snug text-white sm:text-sm sm:leading-tight">{activeNode.label}</p>
                <p className="text-[10px] font-medium leading-snug text-white/60 sm:text-[11px]">
                  {activeNode.isHub ? t('home.networkHq') : t('home.networkRoute')}
                </p>
              </div>
              {activeNode.isHub && (
                <span className="hidden shrink-0 rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#d4af37] sm:inline">
                  {t('home.networkHqBadge')}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Stats — follows page theme */}
      <motion.div
        className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-3 shadow-[var(--shadow-sm)] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:px-6"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.35, duration: 0.4 }}
      >
        {[
          { value: `${nodes.length - 1}+`, label: t('home.networkMarkets') },
          { value: '24/7', label: t('home.networkLogistics') },
          { value: '3', label: t('home.statPorts') },
        ].map((item) => (
          <div key={item.label} className="min-w-0 text-center">
            <p className="text-sm font-bold leading-none text-primary-green sm:text-base lg:text-lg">{item.value}</p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-[11px] sm:tracking-wider">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Country chips — follows page theme */}
      <motion.ul
        className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.45, duration: 0.4 }}
      >
        {nodes.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              onClick={() => setActiveId(node.id)}
              className={cn(
                'inline-flex max-w-full items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold leading-none transition-all duration-300 sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-sm',
                activeId === node.id
                  ? 'border-primary-green bg-primary-green text-white shadow-[var(--shadow-sm)]'
                  : 'border-border bg-surface-elevated text-foreground shadow-[var(--shadow-sm)] hover:border-primary-green/40 hover:bg-accent-soft',
              )}
            >
              {node.flag && <span className="shrink-0 text-sm leading-none sm:text-base">{node.flag}</span>}
              <span className="truncate">{node.label}</span>
            </button>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
