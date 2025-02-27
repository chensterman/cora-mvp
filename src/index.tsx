import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/globals.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ActionEmail from './pages/ActionEmail';
import CampaignList from './pages/CampaignList';
import CampaignListSub from './pages/CampaignListSub';
import CampaignListSubMetric from './pages/CampaignListSubMetric';
import CampaignSetup from './pages/CampaignSetup';
import CampaignPost from './pages/CampaignPost';
import Roadmap from './pages/Roadmap';
import YourTasks from './pages/YourTasks';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/tasks" element={<YourTasks />} />
        <Route path="/action-email/:type" element={<ActionEmail />} />
        <Route path="/campaign-list" element={<CampaignList />} />
        <Route path="/campaign-list-sub/:type" element={<CampaignListSub />} />
        <Route path="/campaign-list-sub-metric/:type/:metric" element={<CampaignListSubMetric />} />
        <Route path="/campaign-setup/:type/:metric/:item" element={<CampaignSetup />} />
        <Route path="/campaign-post/:type/:metric/:item" element={<CampaignPost />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
