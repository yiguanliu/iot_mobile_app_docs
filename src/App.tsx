import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from './components/layout/DocsLayout'

import IntroductionPage   from './pages/IntroductionPage'
import InstallationPage   from './pages/InstallationPage'
import ThemingPage        from './pages/ThemingPage'
import ColorsPage         from './pages/ColorsPage'
import TypographyPage     from './pages/TypographyPage'
import RadiusPage         from './pages/RadiusPage'
import SpacingPage        from './pages/SpacingPage'
import MotionPage         from './pages/MotionPage'
import StubPage           from './pages/StubPage'

import ButtonPage         from './pages/components/ButtonPage'
import SliderPage         from './pages/components/SliderPage'
import PillButtonPage     from './pages/components/PillButtonPage'
import SceneChipPage      from './pages/components/SceneChipPage'
import TogglePage         from './pages/components/TogglePage'
import CardPage           from './pages/components/CardPage'
import MetricCardPage     from './pages/components/MetricCardPage'
import StatusDotPage      from './pages/components/StatusDotPage'
import SensorHaloPage     from './pages/components/SensorHaloPage'
import CircularDimmerPage from './pages/components/CircularDimmerPage'
import NavTilePage        from './pages/components/NavTilePage'

import SceneStripPage     from './pages/blocks/SceneStripPage'
import ZoneTilePage       from './pages/blocks/ZoneTilePage'
import FloorplanPage      from './pages/blocks/FloorplanPage'
import LightingPanelPage  from './pages/blocks/LightingPanelPage'
import SensorGridPage     from './pages/blocks/SensorGridPage'
import SettingsPanelPage  from './pages/blocks/SettingsPanelPage'
import AddSensorSheetPage from './pages/blocks/AddSensorSheetPage'

export default function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        {/* Getting started */}
        <Route index element={<IntroductionPage />} />
        <Route path="installation" element={<InstallationPage />} />

        {/* Foundations */}
        <Route path="theming"    element={<ThemingPage />} />
        <Route path="colors"     element={<ColorsPage />} />
        <Route path="typography" element={<TypographyPage />} />
        <Route path="radius"     element={<RadiusPage />} />
        <Route path="spacing"    element={<SpacingPage />} />
        <Route path="motion"     element={<MotionPage />} />

        {/* Components */}
        <Route path="components/button"          element={<ButtonPage />} />
        <Route path="components/slider"          element={<SliderPage />} />
        <Route path="components/pill-button"     element={<PillButtonPage />} />
        <Route path="components/scene-chip"      element={<SceneChipPage />} />
        <Route path="components/toggle"          element={<TogglePage />} />
        <Route path="components/card"            element={<CardPage />} />
        <Route path="components/metric-card"     element={<MetricCardPage />} />
        <Route path="components/status-dot"      element={<StatusDotPage />} />
        <Route path="components/sensor-halo"     element={<SensorHaloPage />} />
        <Route path="components/circular-dimmer" element={<CircularDimmerPage />} />
        <Route path="components/nav-tile"        element={<NavTilePage />} />

        {/* Blocks */}
        <Route path="blocks/scene-strip"      element={<SceneStripPage />} />
        <Route path="blocks/zone-tile"        element={<ZoneTilePage />} />
        <Route path="blocks/floorplan"        element={<FloorplanPage />} />
        <Route path="blocks/lighting-panel"   element={<LightingPanelPage />} />
        <Route path="blocks/sensor-grid"      element={<SensorGridPage />} />
        <Route path="blocks/settings-panel"   element={<SettingsPanelPage />} />
        <Route path="blocks/add-sensor-sheet" element={<AddSensorSheetPage />} />

        {/* Catch-all (kept for forward-compat) */}
        <Route path="*" element={<StubPage />} />
      </Route>
    </Routes>
  )
}
