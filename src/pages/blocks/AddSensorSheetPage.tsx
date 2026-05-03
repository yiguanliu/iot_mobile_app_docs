import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Sun, Volume2, Lightbulb, Zap, CloudRain, FlaskConical, Plus } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

const DEVICES = [
  { id: 'co2',   icon: Wind,         label: 'CO₂',       sublabel: 'ppm' },
  { id: 'uv',    icon: Sun,          label: 'UV INDEX',  sublabel: 'idx' },
  { id: 'noise', icon: Volume2,      label: 'NOISE',     sublabel: 'dB' },
  { id: 'lux',   icon: Lightbulb,    label: 'LUMINANCE', sublabel: 'lux' },
  { id: 'power', icon: Zap,          label: 'POWER',     sublabel: 'W' },
  { id: 'rain',  icon: CloudRain,    label: 'RAINFALL',  sublabel: 'mm' },
  { id: 'voc',   icon: FlaskConical, label: 'VOC',       sublabel: 'µg/m³' },
]

function AddSensorSheetBlock() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string[]>([])

  const togglePicked = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 360, height: 480, overflow: 'hidden', borderRadius: 'var(--radius-card)', background: 'var(--bg)' }}>
      {/* Trigger area (mock app screen) */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>iot.hub</div>
          <button
            onClick={() => setOpen(true)}
            style={{
              width: 36, height: 36, borderRadius: 'var(--radius-pill)',
              background: 'var(--text-primary)', color: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Plus size={16} strokeWidth={2} />
          </button>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)' }}>
          {picked.length === 0 ? 'No sensors yet — tap +' : `${picked.length} sensor${picked.length === 1 ? '' : 's'} added`}
        </div>
      </div>

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'var(--bg-card)',
                borderRadius: '20px 20px 0 0',
                padding: '12px 0 16px',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 8px' }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--text-muted)', opacity: 0.4 }} />
              </div>

              <div style={{ padding: '8px 20px 0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                  ADD SENSOR
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  Select a device to add to the dashboard
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {DEVICES.map((d) => {
                    const added = picked.includes(d.id)
                    return (
                      <button
                        key={d.id}
                        onClick={() => togglePicked(d.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '12px 12px', textAlign: 'left',
                          background: added ? 'var(--bg-card-dark)' : 'var(--bg)',
                          borderRadius: 'var(--radius-tight, 12px)',
                          opacity: added ? 0.6 : 1,
                        }}
                      >
                        <d.icon size={20} strokeWidth={1.75} color="var(--text-primary)" />
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em' }}>{d.label}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{d.sublabel}</div>
                        </div>
                        {added && (
                          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>✓</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AddSensorSheetPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Add Sensor Sheet"
        description="Bottom sheet that slides up to pick a sensor from the catalog. Tap the + button in the preview to open it. Backdrop dismisses on tap; spring animation gives a tactile snap."
      />

      <ComponentPreview
        align="start"
        minHeight={520}
        code={`<button onClick={() => setOpen(true)}>+ Add</button>

<AnimatePresence>
  {open && (
    <>
      <motion.div /* backdrop */ />
      <motion.div /* sheet */
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <DeviceGrid />
      </motion.div>
    </>
  )}
</AnimatePresence>`}
      >
        <AddSensorSheetBlock />
      </ComponentPreview>

      <Section title="Why a sheet, not a modal?">
        <ul>
          <li><strong>Mobile-first ergonomic</strong> — bottom-anchored content sits within thumb reach.</li>
          <li><strong>Doesn't block context</strong> — top of the screen stays visible so you remember which device you're configuring.</li>
          <li><strong>Spring animation</strong> — stiffness 320, damping 32 produces a snappy entrance without overshooting.</li>
        </ul>
      </Section>

      <Section title="Drag-handle convention" description="The 36×4 rounded rect at the top of the sheet is purely visual — it doesn't enable drag-to-dismiss in this prototype. It's a strong affordance that signals 'this is a sheet' without requiring users to read the gesture from animation alone.">
        <CodeBlock
          language="tsx"
          code={`<div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 8px' }}>
  <div style={{
    width: 36, height: 4, borderRadius: 2,
    background: 'var(--text-muted)',
    opacity: 0.4,
  }} />
</div>`}
        />
      </Section>
    </div>
  )
}
