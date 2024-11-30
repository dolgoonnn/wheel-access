import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { MapComponent } from './components/Map/MapComponent';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { sampleLocations } from './utils/sampleLocations';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Interactive Map with Clusters
                  </h1>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <MapComponent
                      locations={sampleLocations}
                      center={[47.9133696, 106.9351907]}
                      zoom={13}
                    />
                  </div>
                </div>
              }
            />
            <Route path="/accessibility" element={<AccessibilityPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;