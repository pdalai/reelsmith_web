import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SettingsConfiguration from './pages/settings-configuration';
import IdeasCollection from './pages/ideas-collection';
import TemplateSelection from './pages/template-selection';
import ReelAnalysisInput from './pages/reel-analysis-input';
import MediaUploadWorkspace from './pages/media-upload-workspace';
import VideoExportStudio from './pages/video-export-studio';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<IdeasCollection />} />
        <Route path="/settings-configuration" element={<SettingsConfiguration />} />
        <Route path="/ideas-collection" element={<IdeasCollection />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/reel-analysis-input" element={<ReelAnalysisInput />} />
        <Route path="/media-upload-workspace" element={<MediaUploadWorkspace />} />
        <Route path="/video-export-studio" element={<VideoExportStudio />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
