import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [error, setError] = useState('');

  const calculateDifference = () => {
    // Reset previous states
    setError('');
    setResult(null);

    // Validate inputs
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate date order
    if (end < start) {
      setError('End date must be after start date');
      return;
    }
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight uppercase">DATE CALCULATOR</h1>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">Calculate the duration between two dates</p>
            <p className="text-lg text-blue-600 font-medium bg-blue-50 inline-block px-4 py-1 rounded-full shadow-sm">
              Designed and Developed by Aniruddh Joshi
            </p>
          </div>
        </div>

        {/* Calculator Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-center font-medium bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={calculateDifference}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <Clock className="w-5 h-5" />
              Calculate Duration
            </button>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Duration Result</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 transform hover:scale-105 transition-transform duration-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">{result.years}</div>
                <div className="text-sm font-medium text-gray-600">Years</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 transform hover:scale-105 transition-transform duration-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">{result.months}</div>
                <div className="text-sm font-medium text-gray-600">Months</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 transform hover:scale-105 transition-transform duration-200">
                <div className="text-3xl font-bold text-pink-600 mb-1">{result.days}</div>
                <div className="text-sm font-medium text-gray-600">Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;