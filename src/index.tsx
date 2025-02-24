import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/globals.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ActionEmail from './pages/ActionEmail';
import CampaignList from './pages/CampaignList';
import CampaignUsage from './pages/CampaignUsage';
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
        <Route path="/action-email/:type" element={<ActionEmail />} />
        <Route path="/campaign-list" element={<CampaignList />} />
        <Route path="/campaign-usage" element={<CampaignUsage />} />
        <Route path="/campaign-setup/:type" element={<CampaignSetup />} />
        <Route path="/campaign-post/:type" element={<CampaignPost />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/tasks" element={<YourTasks />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
