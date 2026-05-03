/**
 * Sidebar nav structure. Drives the Sidebar component; routes are registered
 * separately in App.tsx so each page can lazy-load when we add code-splitting.
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
      { slug: 'radius',              label: 'Radius',       ready: true },
      { slug: 'spacing',             label: 'Spacing',      ready: true },
      { slug: 'motion',              label: 'Motion',       ready: true },
    ],
  },
  {
    label: 'Components',
    items: [
      { slug: 'components/button',         label: 'Button',          ready: true },
      { slug: 'components/slider',         label: 'Slider',          ready: true },
      { slug: 'components/pill-button',    label: 'Pill Button',     ready: true },
      { slug: 'components/scene-chip',     label: 'Scene Chip',      ready: true },
      { slug: 'components/toggle',         label: 'Toggle',          ready: true },
      { slug: 'components/card',           label: 'Card',            ready: true },
      { slug: 'components/metric-card',    label: 'Metric Card',     ready: true },
      { slug: 'components/status-dot',     label: 'Status Dot',      ready: true },
      { slug: 'components/sensor-halo',    label: 'Sensor Halo',     ready: true },
      { slug: 'components/circular-dimmer',label: 'Circular Dimmer', ready: true },
      { slug: 'components/nav-tile',       label: 'Nav Tile',        ready: true },
    ],
  },
  {
    label: 'Blocks',
    items: [
      { slug: 'blocks/scene-strip',        label: 'Scene Strip',     ready: true },
      { slug: 'blocks/zone-tile',          label: 'Zone Tile',       ready: true },
      { slug: 'blocks/floorplan',          label: 'Floorplan',       ready: true },
      { slug: 'blocks/lighting-panel',     label: 'Lighting Panel',  ready: true },
      { slug: 'blocks/sensor-grid',        label: 'Sensor Grid',     ready: true },
      { slug: 'blocks/settings-panel',     label: 'Settings Panel',  ready: true },
      { slug: 'blocks/add-sensor-sheet',   label: 'Add Sensor Sheet',ready: true },
    ],
  },
]
