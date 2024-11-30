import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { MapComponent } from './components/Map/MapComponent';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { sampleLocations } from './utils/sampleLocations';
import { ComplaintsPage } from './pages/Complaints';

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
                  {/* <h1 className="mb-6 text-3xl font-bold text-gray-800">
                    Interactive Map with Clusters
                  </h1> */}
                  <div className="p-6 bg-white rounded-lg shadow-lg">
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
            <Route path="/complaints" element={<ComplaintsPage />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;