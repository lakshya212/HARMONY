import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, Home, Key, User, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { household } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mode: 'join', // 'join' or 'create'
    inviteCode: 'GRN101',
    householdName: 'Green Residency Flat 402'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In our live demo, proceed to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-slate-900">
            HARMONY<span className="text-blue-600">.</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Create Student Account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Lakshya Sharma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">College Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="lakshya@imsnoida.com"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Household Setup Mode
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'join' })}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                    formData.mode === 'join'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Join Existing Flat
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'create' })}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                    formData.mode === 'create'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Create New Flat
                </button>
              </div>

              {formData.mode === 'join' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700">Flat Invite Code</label>
                  <input
                    type="text"
                    required
                    value={formData.inviteCode}
                    onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value.toUpperCase() })}
                    className="mt-1 block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 uppercase font-mono tracking-wider text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="GRN101"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Default demo code: <span className="font-semibold text-blue-600">GRN101</span>
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700">Flat / Apartment Name</label>
                  <input
                    type="text"
                    required
                    value={formData.householdName}
                    onChange={(e) => setFormData({ ...formData, householdName: e.target.value })}
                    className="mt-1 block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Lotus Boulevard Tower 3 Flat 501"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Complete Registration & Enter Flat <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-800">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
