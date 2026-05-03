/**
 * Sidebar nav structure. Drives both the Sidebar component and the route
 * registration in App.tsx (alongside data/components.ts which holds the
 * actual page modules).
 */

export interface NavItem {
  slug: string
  label: string
  /** When false the page is a stub — sidebar marks it "Coming soon". */
  ready?: boolean
}

export interface NavSection {
  label: string
  items: NavItem[]
}

export const NAV: NavSection[] = [
  {
    label: 'Getting Started',
    items: [
      { slug: '',                    label: 'Introduction', ready: true },
      { slug: 'installation',        label: 'Installation', ready: true },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { slug: 'theming',             label: 'Theming',      ready: true },
      { slug: 'colors',              label: 'Colors',       ready: true },
      { slug: 'typography',          label: 'Typography',   ready: true },
      { slug: 'radius',              label: 'Radius' },
      { slug: 'spacing',             label: 'Spacing' },
      { slug: 'motion',              label: 'Motion' },
    ],
  },
  {
    label: 'Components',
    items: [
      { slug: 'components/button',         label: 'Button',          ready: true },
      { slug: 'components/slider',         label: 'Slider',          ready: true },
      { slug: 'components/pill-button',    label: 'Pill Button',     ready: true },
      { slug: 'components/scene-chip',     label: 'Scene Chip',      ready: true },
      { slug: 'components/toggle',         label: 'Toggle' },
      { slug: 'components/card',           label: 'Card' },
      { slug: 'components/metric-card',    label: 'Metric Card' },
      { slug: 'components/status-dot',     label: 'Status Dot' },
      { slug: 'components/sensor-halo',    label: 'Sensor Halo' },
      { slug: 'components/circular-dimmer',label: 'Circular Dimmer' },
      { slug: 'components/nav-tile',       label: 'Nav Tile' },
    ],
  },
  {
    label: 'Blocks',
    items: [
      { slug: 'blocks/scene-strip',        label: 'Scene Strip',     ready: true },
      { slug: 'blocks/zone-tile',          label: 'Zone Tile',       ready: true },
      { slug: 'blocks/floorplan',          label: 'Floorplan' },
      { slug: 'blocks/lighting-panel',     label: 'Lighting Panel' },
      { slug: 'blocks/sensor-grid',        label: 'Sensor Grid' },
      { slug: 'blocks/settings-panel',     label: 'Settings Panel' },
      { slug: 'blocks/add-sensor-sheet',   label: 'Add Sensor Sheet' },
    ],
  },
]
