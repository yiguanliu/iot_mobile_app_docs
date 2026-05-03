import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from './components/layout/DocsLayout'

import IntroductionPage   from './pages/IntroductionPage'
import InstallationPage   from './pages/InstallationPage'
import ThemingPage        from './pages/ThemingPage'
import ColorsPage         from './pages/ColorsPage'
import TypographyPage     from './pages/TypographyPage'
import StubPage           from './pages/StubPage'

import ButtonPage         from './pages/components/ButtonPage'
import SliderPage         from './pages/components/SliderPage'
import PillButtonPage     from './pages/components/PillButtonPage'
import SceneChipPage      from './pages/components/SceneChipPage'

import SceneStripPage     from './pages/blocks/SceneStripPage'
import ZoneTilePage       from './pages/blocks/ZoneTilePage'

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

        {/* Components */}
        <Route path="components/button"      element={<ButtonPage />} />
        <Route path="components/slider"      element={<SliderPage />} />
        <Route path="components/pill-button" element={<PillButtonPage />} />
        <Route path="components/scene-chip"  element={<SceneChipPage />} />

        {/* Blocks */}
        <Route path="blocks/scene-strip" element={<SceneStripPage />} />
        <Route path="blocks/zone-tile"   element={<ZoneTilePage />} />

        {/* Catch-all for stubs */}
        <Route path="*" element={<StubPage />} />
      </Route>
    </Routes>
  )
}
