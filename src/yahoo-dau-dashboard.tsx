import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, ArrowRight, Target, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const YahooDAUDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = {
    baseline: '#ef4444',
    conservative: '#f59e0b',
    base: '#10b981',
    aggressive: '#3b82f6'
  };

  const retentionData = [
    { segment: 'Core (5-7x/week)', current: 3.5, retention: '90%', retained: 3.15, source: 'Industry avg for high-engagement email users' },
    { segment: 'Casual (2-4x/week)', current: 4.0, retention: '75%', retained: 3.0, source: 'Historical Yahoo Mail cohort data (Q3 2024)' },
    { segment: 'At-risk (<2x/week)', current: 2.5, retention: '50%', retained: 1.25, source: 'Conservative estimate, peer benchmarks show 45-55%' }
  ];

  const scenarioComparison = [
    { name: 'Baseline', value: 7.98, color: COLORS.baseline },
    { name: 'Conservative', value: 10.34, color: COLORS.conservative },
    { name: 'Base Case', value: 12.01, color: COLORS.base },
    { name: 'Aggressive', value: 14.10, color: COLORS.aggressive }
  ];

  const comparativeBuildupData = [
    { 
      scenario: 'Baseline',
      retained: 7.4,
      reactivation: 0.15,
      newAccounts: 0.43,
      total: 7.98
    },
    { 
      scenario: 'Conservative',
      retained: 7.4,
      reactivation: 2.51,
      newAccounts: 0.43,
      total: 10.34
    },
    { 
      scenario: 'Base',
      retained: 7.4,
      reactivation: 4.18,
      newAccounts: 0.43,
      total: 12.01
    },
    { 
      scenario: 'Aggressive',
      retained: 7.4,
      reactivation: 6.27,
      newAccounts: 0.43,
      total: 14.10
    }
  ];

  const sensitivityData = [
    { parameter: 'Base Case', dau: 12.01, change: '—' },
    { parameter: 'Retention -5%', dau: 11.64, change: '-3.1%' },
    { parameter: 'Retention +5%', dau: 12.38, change: '+3.1%' },
    { parameter: 'New Signups -20%', dau: 11.93, change: '-0.7%' },
    { parameter: 'Reactivation Success -10%', dau: 11.59, change: '-3.5%' },
    { parameter: 'Reactivation Success +10%', dau: 12.43, change: '+3.5%' }
  ];

  const newAccountRetentionData = [
    { month: 'M0', retention: 100 },
    { month: 'M1', retention: 60 },
    { month: 'M2', retention: 50 },
    { month: 'M3', retention: 45 },
    { month: 'M4', retention: 40 },
    { month: 'M5', retention: 35 },
    { month: 'M6', retention: 30 },
    { month: 'M7', retention: 25 },
    { month: 'M8', retention: 22 },
    { month: 'M9', retention: 20 },
    { month: 'M10', retention: 18 },
    { month: 'M11', retention: 16 },
    { month: 'M12', retention: 15 }
  ];

  const validationMetrics = [
    { 
      metric: 'Week-1 Retention (New Users)',
      baseline: '62%',
      target: '68%',
      leading: 'Tracks new account quality',
      frequency: 'Weekly'
    },
    { 
      metric: 'Monthly → Weekly Conversion',
      baseline: '1.2%',
      target: '2.0%',
      leading: 'Early signal of reactivation success',
      frequency: 'Monthly'
    },
    { 
      metric: 'Email Open Rate (Inactive)',
      baseline: '8%',
      target: '12%',
      leading: 'Engagement with reactivation campaigns',
      frequency: 'Weekly'
    },
    { 
      metric: 'NPS Score',
      baseline: '42',
      target: '50',
      leading: 'Product quality / word-of-mouth',
      frequency: 'Monthly'
    }
  ];

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{payload[0].payload.component || payload[0].name}</p>
          <p className="text-blue-600 font-semibold">{payload[0].value.toFixed(2)}M DAU</p>
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', color: 'bg-slate-600' },
    { id: 'assumptions', label: 'Key Assumptions', color: 'bg-purple-600', icon: Target },
    { id: 'baseline', label: 'Baseline: 8.0M', color: 'bg-red-600', icon: TrendingDown },
    { id: 'conservative', label: 'Conservative: 10.34M', color: 'bg-yellow-600', icon: TrendingDown },
    { id: 'base', label: 'Base: 12.01M', color: 'bg-green-600', icon: TrendingUp },
    { id: 'aggressive', label: 'Aggressive: 14.1M', color: 'bg-blue-600', icon: TrendingUp },
    { id: 'validation', label: 'Risk & Validation', color: 'bg-orange-600', icon: AlertTriangle }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Yahoo Mail DAU Growth Model
          </h1>
          <p className="text-slate-600 text-lg">2026 Forecast: Strategic Path from Decline to Growth</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? `${tab.color} text-white shadow-lg`
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {Icon && <Icon size={18} />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <AlertCircle size={40} className="flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold mb-3">The Problem</h2>
                  <div className="text-xl mb-2">
                    10M DAU from 225M MAU = <span className="font-bold text-yellow-300">4.4% DAU/MAU ratio</span>
                  </div>
                  <p className="text-lg text-red-100 mb-3">
                    We have 215M monthly users who don't check email daily. Without intervention, we decline 22% in 2026.
                  </p>
                  <div className="bg-red-700/50 rounded-lg p-3 text-sm">
                    <strong>Business Impact:</strong> Each 1M DAU ≈ $8-12M annual ad revenue. A 2M decline = $16-24M revenue loss.
                  </div>
                </div>
              </div>
            </div>

            {/* Why We Can Win */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3">Why We Can Win</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-700/30 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">225M</div>
                  <div className="text-sm text-blue-100">MAU give us massive TAM for reactivation experiments</div>
                </div>
                <div className="bg-blue-700/30 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">25+ years</div>
                  <div className="text-sm text-blue-100">Brand trust & user familiarity in a crowded market</div>
                </div>
                <div className="bg-blue-700/30 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">4.4% → 8%</div>
                  <div className="text-sm text-blue-100">Moving halfway to industry avg (12-15%) gets us to 18M DAU</div>
                </div>
              </div>
            </div>

            {/* My Approach */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Strategic Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-slate-600">
                  <div className="text-2xl font-bold text-slate-900 mb-2">Step 1</div>
                  <div className="font-semibold text-slate-700 mb-2">Model Retention</div>
                  <p className="text-sm text-slate-600">
                    Segment current 10M DAU by engagement. Apply industry-validated retention rates.
                    <br />
                    <span className="font-semibold text-slate-900">Result: 7.4M retained</span>
                    <br />
                    <button 
                      onClick={() => setActiveTab('assumptions')}
                      className="text-blue-600 hover:text-blue-800 underline text-sm mt-1 cursor-pointer"
                    >
                      See assumptions →
                    </button>
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-slate-600">
                  <div className="text-2xl font-bold text-slate-900 mb-2">Step 2</div>
                  <div className="font-semibold text-slate-700 mb-2">Calculate New Users</div>
                  <p className="text-sm text-slate-600">
                    Based on 1B monthly Yahoo visitors, model new account signups with historical activation & retention curves.
                    <br /><span className="font-semibold text-slate-900">Result: 432K new DAU</span>
                  </p>
                  <button 
                      onClick={() => setActiveTab('assumptions')}
                      className="text-blue-600 hover:text-blue-800 underline text-sm mt-1 cursor-pointer"
                    >
                      See calculations →
                    </button>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-slate-600">
                  <div className="text-2xl font-bold text-slate-900 mb-2">Step 3</div>
                  <div className="font-semibold text-slate-700 mb-2">Model Reactivation</div>
                  <p className="text-sm text-slate-600">
                    Run experiments on 215M MAU (segmented by engagement) with conversion targets based on A/B test benchmarks.
                    <br /><span className="font-semibold text-slate-900">Result: 0.15M to 6.27M</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Comparative Component Breakdown - NEW */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Component Breakdown Across Scenarios</h2>
              <p className="text-sm text-slate-600 mb-4">The reactivation lever is the primary driver of growth variance between scenarios</p>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={comparativeBuildupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="scenario" 
                    stroke="#64748b" 
                    style={{ fontSize: '14px' }}
                    tick={(props) => {
                      const colors = {
                        'Baseline': '#ef4444',
                        'Conservative': '#f59e0b',
                        'Base': '#10b981',
                        'Aggressive': '#3b82f6'
                      };
                      return (
                        <text 
                          x={props.x} 
                          y={props.y} 
                          dy={16} 
                          textAnchor="middle" 
                          fill={colors[props.payload.value] || '#64748b'}
                          fontSize={14}
                          fontWeight="600"
                        >
                          {props.payload.value}
                        </text>
                      );
                    }}
                  />
                  <YAxis stroke="#64748b" style={{ fontSize: '14px' }} tickFormatter={(v) => `${v}M`} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="retained" stackId="a" fill="#94a3b8" name="Retained Base (7.4M)" />
                  <Bar dataKey="reactivation" stackId="a" fill="#3b82f6" name="Reactivation (variable)" />
                  <Bar dataKey="newAccounts" stackId="a" fill="#10b981" name="New Accounts (0.43M)" />
                  <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={3} name="Total DAU" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <strong>Key Insight:</strong> Retained base and new accounts are relatively stable (~7.8M). 
                Reactivation is our highest-leverage, highest-risk growth driver (0.15M → 6.27M range).
              </div>
            </div>



            {/* Key Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-red-700 uppercase mb-1">Baseline</div>
                <div className="text-3xl font-bold text-red-600 mb-1">8.0M</div>
                <div className="text-sm text-red-700">-20% decline</div>
                <div className="text-xs text-red-600 mt-1">-$16-24M revenue</div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-yellow-700 uppercase mb-1">Conservative</div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">10.34M</div>
                <div className="text-sm text-yellow-700">+3.4% growth</div>
                <div className="text-xs text-yellow-600 mt-1">+$3-5M revenue</div>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-green-700 uppercase mb-1">Base Case</div>
                <div className="text-3xl font-bold text-green-600 mb-1">12.01M</div>
                <div className="text-sm text-green-700">+20.1% growth</div>
                <div className="text-xs text-green-600 mt-1">+$16-24M revenue</div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-blue-700 uppercase mb-1">Aggressive</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">14.1M</div>
                <div className="text-sm text-blue-700">+41% growth</div>
                <div className="text-xs text-blue-600 mt-1">+$33-49M revenue</div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle size={32} className="flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Recommendation: Target Base Case (12.01M)</h3>
                  <p className="text-green-100 mb-3">
                    This represents realistic execution with focused experiments and 50% success rate on reactivation initiatives.
                  </p>
                  <div className="bg-green-700/40 rounded-lg p-3 text-sm">
                    <strong>Next Step:</strong> Move to Risk & Validation tab to see de-risking plan and leading indicators we'll track.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ASSUMPTIONS TAB - NEW */}
        {activeTab === 'assumptions' && (
          <div className="space-y-6">
            <div className="bg-purple-600 text-white rounded-xl p-6">
              <h2 className="text-3xl font-bold mb-2">Key Assumptions & Data Sources</h2>
              <p className="text-purple-100">All assumptions are grounded in historical data, industry benchmarks, or conservative estimates</p>
            </div>

            {/* Baseline Assumptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Baseline Assumptions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="text-sm text-slate-600 mb-1">Yahoo Overall MAU</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">1B</div>
                  <div className="text-xs text-slate-600">Monthly active users across all Yahoo properties (Finance, Sports, News, etc.)</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="text-sm text-slate-600 mb-1">Yahoo Mail MAU</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">225M</div>
                  <div className="text-xs text-slate-600">Monthly active users who check Yahoo Mail at least once per month</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="text-sm text-slate-600 mb-1">Starting DAU (End of 2025)</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">10M</div>
                  <div className="text-xs text-slate-600">Daily active users checking Yahoo Mail at least once per day</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="text-sm text-slate-600 mb-1">DAU/MAU Ratio</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">4.4%</div>
                  <div className="text-xs text-slate-600">10M DAU ÷ 225M MAU = significant opportunity to increase daily engagement</div>
                </div>
              </div>
              
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Scope & Context</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Platform Coverage:</strong> Model accounts for both mobile and desktop users across all platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Geographic Scope:</strong> Includes users worldwide, not limited to specific regions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>External Factors:</strong> Model assumes no drastic external changes (major competitor exits, regulatory shifts, economic shocks, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Time Horizon:</strong> All projections are for end of 2026 (12-month forecast from end of 2025)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Retention Assumptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Retention Rate Assumptions</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Segment</th>
                      <th className="text-right p-3 font-semibold">Current DAU</th>
                      <th className="text-right p-3 font-semibold">Retention</th>
                      <th className="text-left p-3 font-semibold">Data Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="p-3">{row.segment}</td>
                        <td className="p-3 text-right">{row.current}M</td>
                        <td className="p-3 text-right font-semibold text-blue-600">{row.retention}</td>
                        <td className="p-3 text-xs text-slate-600">{row.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm">
                <strong>Blended retention rate: 74%</strong> — This is conservative. Gmail retention is ~78-82%. 
                If we improve product quality, we could see +5% lift (see sensitivity analysis).
              </div>
            </div>

            {/* New Account Retention Curve */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. New Account Retention Curve</h3>
              <p className="text-sm text-slate-600 mb-4">
                Shows how newly activated users retain over their first 12 months. This drives the 282K net new DAU calculation.
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={newAccountRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={3} name="New Account Retention" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-slate-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-600">Month 1 Retention</div>
                    <div className="text-xl font-bold text-slate-900">60%</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Month 12 Retention</div>
                    <div className="text-xl font-bold text-slate-900">15%</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Avg Retention (weighted)</div>
                    <div className="text-xl font-bold text-slate-900">~32%</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Total Activated (2026)</div>
                    <div className="text-xl font-bold text-slate-900">1.38M</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <strong>Calculation:</strong> 115K activated per month × 12 months = 1.38M total activated. 
                  Applying retention curve across cohorts = 432K still active by EOY 2026.
                </div>
              </div>
            </div>

            {/* New Account Assumptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. New Account Growth Assumptions</h3>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Potential New Users</span>
                    <span className="text-blue-600 font-bold">775M</span>
                  </div>
                  <div className="text-xs text-slate-600">Yahoo has 1B MAU across properties (Finance, Sports, News). 225M already have email, leaving 775M potential targets.</div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Monthly Conversion Rate</span>
                    <span className="text-blue-600 font-bold">0.1%</span>
                  </div>
                  <div className="text-xs text-slate-600">From cross-product exposure (Finance alerts, Sports notifications, etc.) = 775K monthly signups (9.3M annually)</div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Activation Rate (send 1+ email)</span>
                    <span className="text-blue-600 font-bold">15%</span>
                  </div>
                  <div className="text-xs text-slate-600">775K × 15% = 115K activated users per month (1.38M annually)</div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Retention Curve (see chart above)</span>
                    <span className="text-blue-600 font-bold">60% → 15%</span>
                  </div>
                  <div className="text-xs text-slate-600">M1: 60%, M6: 30%, M12: 15%. Weighted average ~32% across 12 monthly cohorts.</div>
                </div>

                <div className="bg-purple-100 border-2 border-purple-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Net New DAU by EOY 2026</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">432K</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600">
                    Calculation: Each monthly cohort of 115K activated users retains at different rates based on age. 
                    Jan cohort (12 months old): 115K × 15% = 17.25K still active. 
                    Dec cohort (1 month old): 115K × 60% = 69K still active. 
                    Sum across all 12 cohorts = 432K.
                  </div>
                </div>
              </div>
            </div>

            {/* Reactivation Conversion Assumptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">4. Reactivation Conversion Rate Assumptions</h3>
              <p className="text-sm text-slate-600 mb-4">
                Conversion rates based on A/B test benchmarks from similar reactivation campaigns (email products, mature user bases)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3">Segment</th>
                      <th className="text-right p-3">Size</th>
                      <th className="text-right p-3">Target Conv %</th>
                      <th className="text-left p-3">Benchmark Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3">Almost Daily (3-4x/wk)</td>
                      <td className="p-3 text-right">35M</td>
                      <td className="p-3 text-right font-semibold text-blue-600">8%</td>
                      <td className="p-3 text-xs">Gmail notification tests: 7-11% for high-frequency users</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3">Weekly Users (1x/wk)</td>
                      <td className="p-3 text-right">65M</td>
                      <td className="p-3 text-right font-semibold text-blue-600">5%</td>
                      <td className="p-3 text-xs">Industry avg for weekly→daily: 4-6% with strong triggers</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3">Monthly Users (less than 4x/mo)</td>
                      <td className="p-3 text-right">115M</td>
                      <td className="p-3 text-right font-semibold text-blue-600">2%</td>
                      <td className="p-3 text-xs">Conservative: dormant user campaigns typically 1-3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <strong>Note:</strong> Success rate (30%, 50%, 75%) is applied ON TOP of these conversion rates. 
                For example: 35M × 8% × 50% = 1.4M in Base Case scenario.
              </div>
            </div>

            {/* Competitive Benchmark */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">5. Competitive Benchmarking</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg text-center border-2 border-red-200">
                  <div className="text-sm text-slate-600 mb-1">Yahoo Mail (Current)</div>
                  <div className="text-4xl font-bold text-red-600 mb-1">4.4%</div>
                  <div className="text-xs text-slate-600">DAU/MAU ratio</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center border-2 border-blue-200">
                  <div className="text-sm text-slate-600 mb-1">Gmail (Est.)</div>
                  <div className="text-4xl font-bold text-blue-600 mb-1">12-15%</div>
                  <div className="text-xs text-slate-600">Industry leader</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
                  <div className="text-sm text-slate-600 mb-1">Our Base Case Target</div>
                  <div className="text-4xl font-bold text-green-600 mb-1">5.3%</div>
                  <div className="text-xs text-slate-600">11.86M / 225M</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                <strong>Implication:</strong> We're not trying to match Gmail. We're trying to move from bottom quartile (4.4%) 
                toward median (8-10%). Getting halfway there = 18M DAU (still within realistic range).
              </div>
            </div>
          </div>
        )}

        {/* BASELINE TAB */}
        {activeTab === 'baseline' && (
          <div className="space-y-6">
            <div className="bg-red-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Baseline Scenario: Do Nothing</h2>
                  <p className="text-red-100">Natural retention + organic growth only</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">8.0M</div>
                  <div className="text-xl text-red-200">-20% decline</div>
                </div>
              </div>
            </div>

            {/* Retention Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Retained Base: 7.4M</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Segment</th>
                      <th className="text-right p-3 font-semibold">Current DAU</th>
                      <th className="text-right p-3 font-semibold">Retention</th>
                      <th className="text-right p-3 font-semibold">Retained</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="p-3">{row.segment}</td>
                        <td className="p-3 text-right">{row.current}M</td>
                        <td className="p-3 text-right">{row.retention}</td>
                        <td className="p-3 text-right font-semibold text-blue-600">{row.retained}M</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-3">TOTAL</td>
                      <td className="p-3 text-right">10M</td>
                      <td className="p-3 text-right">74%</td>
                      <td className="p-3 text-right text-blue-600">7.4M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                Warning: <strong>26% churn</strong> - We lose 2.6M users from natural attrition
              </div>
            </div>

            {/* New Accounts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. New Accounts: 432K</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg flex-1 text-center">
                  <div className="text-2xl font-bold text-blue-600">9.3M</div>
                  <div className="text-xs text-slate-600">Annual signups</div>
                </div>
                <ArrowRight className="text-slate-400" />
                <div className="bg-purple-50 p-4 rounded-lg flex-1 text-center">
                  <div className="text-2xl font-bold text-purple-600">1.38M</div>
                  <div className="text-xs text-slate-600">Activated (15%)</div>
                </div>
                <ArrowRight className="text-slate-400" />
                <div className="bg-green-50 p-4 rounded-lg flex-1 text-center">
                  <div className="text-2xl font-bold text-green-600">432K</div>
                  <div className="text-xs text-slate-600">Still active EOY</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                775K monthly signups × 15% activation × avg 32% retention over first year = 432K
              </p>
            </div>

            {/* Organic Reactivation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Organic Reactivation: 150K</h3>
              <p className="text-sm text-slate-600 mb-2">
                Some inactive users naturally reactivate (important email, remember account exists)
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                215M MAU × 0.07% monthly natural reactivation = ~150K DAU
              </div>
            </div>

            {/* Final Calculation */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Final Calculation</h3>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>Retained Base</span>
                  <span className="font-bold">7.40M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ New Accounts</span>
                  <span className="font-bold">0.43M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Organic Reactivation</span>
                  <span className="font-bold">0.15M</span>
                </div>
                <div className="border-t-2 border-red-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>7.98M</span>
                </div>
                <div className="text-red-200 text-right">-2.02M (-20%)</div>
              </div>
            </div>


          </div>
        )}

        {/* CONSERVATIVE TAB */}
        {activeTab === 'conservative' && (
          <div className="space-y-6">
            <div className="bg-yellow-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Conservative: 30% Success Rate</h2>
                  <p className="text-yellow-100">Many experiments fail, but some work</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">10.34M</div>
                  <div className="text-xl text-yellow-200">+3.4% growth</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reactivation Strategy (30% Success)</h3>
              <p className="text-sm text-slate-600 mb-4">
                We conduct experiments on the 215M MAU users. 30% success means only 3 out of 10 experiments hit their conversion targets.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Almost Daily Users: 35M</div>
                      <div className="text-sm text-slate-600">Check 3-4x/week, close to daily habit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">840K</div>
                      <div className="text-xs text-slate-600">35M × 8% × 30%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Tactic: Smart notifications
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Weekly Users: 65M</div>
                      <div className="text-sm text-slate-600">Check ~1x/week</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">975K</div>
                      <div className="text-xs text-slate-600">65M × 5% × 30%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Tactic: Cross-product integration (Finance alerts, Sports scores)
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Monthly Users: 115M</div>
                      <div className="text-sm text-slate-600">Check less than 4x/month</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">690K</div>
                      <div className="text-xs text-slate-600">115M × 2% × 30%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Tactic: Weekly digest, re-engagement campaigns
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-slate-900">Total Reactivation</div>
                    <div className="text-3xl font-bold text-yellow-600">2.51M</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Final Calculation</h3>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>Retained Base</span>
                  <span className="font-bold">7.40M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Reactivation (30%)</span>
                  <span className="font-bold">2.51M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ New Accounts</span>
                  <span className="font-bold">0.43M</span>
                </div>
                <div className="border-t-2 border-yellow-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>10.34M</span>
                </div>
                <div className="text-yellow-200 text-right">+0.34M (+3.4%)</div>
              </div>
            </div>
          </div>
        )}

        {/* BASE CASE TAB */}
        {activeTab === 'base' && (
          <div className="space-y-6">
            <div className="bg-green-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Base Case: 50% Success Rate</h2>
                  <p className="text-green-100">Realistic execution with focused experiments</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">12.01M</div>
                  <div className="text-xl text-green-200">+20.1% growth</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reactivation Strategy (50% Success)</h3>
              <p className="text-sm text-slate-600 mb-4">
                50% success = half of our experiments hit conversion targets. This is realistic with focused execution and learning from early tests.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Almost Daily Users: 35M</div>
                      <div className="text-sm text-slate-600">Check 3-4x/week, close to daily habit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">1.4M</div>
                      <div className="text-xs text-slate-600">35M × 8% × 50%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Tactic: Smart notifications + habit streaks
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Weekly Users: 65M</div>
                      <div className="text-sm text-slate-600">Check ~1x/week</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">1.63M</div>
                      <div className="text-xs text-slate-600">65M × 5% × 50%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Tactic: Inbox cleanup wizard + cross-product alerts
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Monthly Users: 115M</div>
                      <div className="text-sm text-slate-600">Check less than 4x/month</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">1.15M</div>
                      <div className="text-xs text-slate-600">115M × 2% × 50%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Tactic: Re-engagement campaigns
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-slate-900">Total Reactivation</div>
                    <div className="text-3xl font-bold text-green-600">4.18M</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Final Calculation</h3>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>Retained Base</span>
                  <span className="font-bold">7.40M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Reactivation (50%)</span>
                  <span className="font-bold">4.18M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ New Accounts</span>
                  <span className="font-bold">0.43M</span>
                </div>
                <div className="border-t-2 border-green-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>12.01M</span>
                </div>
                <div className="text-green-200 text-right">+2.01M (+20.1%)</div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                My Recommendation
              </h3>
              <p className="text-green-800 mb-4">
                This is the <strong>realistic target</strong> with focused execution on generally successful reactivation experiments.
              </p>
             
            </div>
          </div>
        )}

        {/* AGGRESSIVE TAB */}
        {activeTab === 'aggressive' && (
          <div className="space-y-6">
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Aggressive: 75% Success Rate</h2>
                  <p className="text-blue-100">Strong execution, experiments exceed expectations</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">14.1M</div>
                  <div className="text-xl text-blue-200">+41% growth</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reactivation Strategy (75% Success)</h3>
              <p className="text-sm text-slate-600 mb-4">
                75% success assumes experiments exceed targets and some viral/network effects kick in. Possible but requires excellent execution.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Almost Daily Users: 35M</div>
                      <div className="text-sm text-slate-600">Check 3-4x/week, close to daily habit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">2.1M</div>
                      <div className="text-xs text-slate-600">35M × 8% × 75%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Experiments exceed targets, viral adoption
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Weekly Users: 65M</div>
                      <div className="text-sm text-slate-600">Check ~1x/week</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">2.44M</div>
                      <div className="text-xs text-slate-600">65M × 5% × 75%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Network effects kick in, word-of-mouth growth
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Monthly Users: 115M</div>
                      <div className="text-sm text-slate-600">Check less than 4x/month</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">1.73M</div>
                      <div className="text-xs text-slate-600">115M × 2% × 75%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    Strong product-market fit improvements
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-slate-900">Total Reactivation</div>
                    <div className="text-3xl font-bold text-blue-600">6.27M</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Final Calculation</h3>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>Retained Base</span>
                  <span className="font-bold">7.40M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Reactivation (75%)</span>
                  <span className="font-bold">6.27M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ New Accounts</span>
                  <span className="font-bold">0.43M</span>
                </div>
                <div className="border-t-2 border-blue-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>14.10M</span>
                </div>
                <div className="text-blue-200 text-right">+4.10M (+41%)</div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Upside Scenario</h3>
              <p className="text-blue-800 mb-3">
                This scenario assumes strong execution and some viral/network effects. 
                Possible if experiments significantly exceed targets and product improvements drive word-of-mouth.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <strong>What would need to be true:</strong>
                <ul className="mt-2 space-y-1 text-slate-700 ml-4">
                  <li>• Notification experiments hit 10-12% conversion (vs 8% target)</li>
                  <li>• Cross-product features drive unexpected adoption</li>
                  <li>• NPS improves to 55+ enabling organic word-of-mouth</li>
                  <li>• Competitor missteps create switching opportunity</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* VALIDATION TAB - NEW */}
        {activeTab === 'validation' && (
          <div className="space-y-6">
            <div className="bg-orange-600 text-white rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle size={36} className="flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold mb-2">Risk Analysis & Validation Plan</h2>
                  <p className="text-orange-100">How we'll validate assumptions early and know if we're on track</p>
                </div>
              </div>
            </div>

            {/* Sensitivity Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Sensitivity Analysis: What If We're Wrong?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Testing how changes to key assumptions impact our Base Case (12.01M) target
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Scenario</th>
                      <th className="text-right p-3 font-semibold">2026 DAU</th>
                      <th className="text-right p-3 font-semibold">Change vs Base</th>
                      <th className="text-left p-3 font-semibold">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row, idx) => (
                      <tr key={idx} className={`border-b border-slate-100 ${row.parameter === 'Base Case' ? 'bg-green-50 font-semibold' : ''}`}>
                        <td className="p-3">{row.parameter}</td>
                        <td className="p-3 text-right">{row.dau}M</td>
                        <td className={`p-3 text-right font-semibold ${
                          row.change.includes('-') ? 'text-red-600' : 
                          row.change.includes('+') ? 'text-green-600' : 
                          'text-slate-500'
                        }`}>
                          {row.change}
                        </td>
                        <td className="p-3 text-xs text-slate-600">
                          {idx === 0 && '—'}
                          {idx === 1 && 'Moderate risk - track retention weekly'}
                          {idx === 2 && 'Upside - focus on product quality'}
                          {idx === 3 && 'Low risk - new accounts are small lever'}
                          {idx === 4 && 'HIGH RISK - reactivation is critical'}
                          {idx === 5 && 'High upside - worth aggressive investment'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <strong className="text-orange-900">Key Finding:</strong>
                <p className="text-orange-800 text-sm mt-1">
                  Reactivation success rate has the highest leverage (±3.5%). This is both our biggest opportunity 
                  and biggest risk. We need to validate this early with small pilots before scaling.
                </p>
              </div>
            </div>

            {/* Leading Indicators */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Leading Indicators: How We'll Know Early</h3>
              <p className="text-sm text-slate-600 mb-4">
                Monthly metrics we'll track to predict if we're on track to Base Case, Conservative, or Baseline
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Metric</th>
                      <th className="text-right p-3 font-semibold">Baseline</th>
                      <th className="text-right p-3 font-semibold">Target</th>
                      <th className="text-left p-3 font-semibold">Why It Matters</th>
                      <th className="text-right p-3 font-semibold">Check Freq</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationMetrics.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="p-3 font-semibold text-slate-900">{row.metric}</td>
                        <td className="p-3 text-right text-slate-600">{row.baseline}</td>
                        <td className="p-3 text-right text-green-600 font-semibold">{row.target}</td>
                        <td className="p-3 text-xs text-slate-600">{row.leading}</td>
                        <td className="p-3 text-right text-xs text-slate-500">{row.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                <strong className="text-green-900">Decision Framework:</strong>
                <div className="mt-2 space-y-1 text-green-800">
                  <div>✓ If 3/4 metrics hit targets by Q2 → On track to Base Case</div>
                  <div>⚠ If 2/4 metrics hit targets → Trending to Conservative</div>
                  <div>✗ If 0-1 metrics hit targets → Risk of Baseline, escalate to leadership</div>
                </div>
              </div>
            </div>

            {/* Risk Mitigation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Top Risks & Mitigation Strategies</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-red-900">Risk #1: Reactivation experiments fail</div>
                      <div className="text-sm text-red-700 mt-1">Probability: 30% | Impact: -4.2M DAU</div>
                    </div>
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">HIGH</div>
                  </div>
                  <div className="text-sm text-slate-700 mt-2">
                    <strong>Mitigation:</strong> Run 3 small pilots in Q1 with different segments before scaling. 
                    Budget for 5 failed experiments. Have pivot plan ready if conversion is less than 5%.
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-yellow-900">Risk #2: Retention drops below 74%</div>
                      <div className="text-sm text-yellow-700 mt-1">Probability: 25% | Impact: -0.5M DAU</div>
                    </div>
                    <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">MEDIUM</div>
                  </div>
                  <div className="text-sm text-slate-700 mt-2">
                    <strong>Mitigation:</strong> Fix top 5 bugs causing churn before launching growth initiatives. 
                    Weekly retention monitoring. Product quality gate: NPS must be 45+ before scaling.
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-blue-900">Risk #3: Competitive response (Gmail launches killer feature)</div>
                      <div className="text-sm text-blue-700 mt-1">Probability: 20% | Impact: Unknown</div>
                    </div>
                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">MEDIUM</div>
                  </div>
                  <div className="text-sm text-slate-700 mt-2">
                    <strong>Mitigation:</strong> Monitor Gmail release notes weekly. Have fast-follow plan. 
                    Focus on differentiation (Yahoo ecosystem integration) that's hard to copy.
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-green-900">Risk #4: Budget cuts mid-year</div>
                      <div className="text-sm text-green-700 mt-1">Probability: 15% | Impact: -1M DAU</div>
                    </div>
                    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">LOW</div>
                  </div>
                  <div className="text-sm text-slate-700 mt-2">
                    <strong>Mitigation:</strong> Front-load highest ROI experiments to Q1-Q2. 
                    Show early wins to secure Q3-Q4 budget. Have "minimum viable" version targeting Conservative scenario.
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Economics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="text-green-600" />
                Unit Economics: Is This Worth It?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Revenue per DAU (annual)</div>
                  <div className="text-3xl font-bold text-slate-900">$8-12</div>
                  <div className="text-xs text-slate-500 mt-1">Based on Q3 2024 ad revenue data</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Cost per Reactivated User</div>
                  <div className="text-3xl font-bold text-slate-900">$2-4</div>
                  <div className="text-xs text-slate-500 mt-1">Blended: eng + product + marketing / reactivated users</div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <strong className="text-green-900 text-lg">ROI Analysis (Base Case):</strong>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Investment Required (2026):</span>
                    <span className="font-semibold text-slate-900">$8.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Incremental DAU (vs Baseline):</span>
                    <span className="font-semibold text-slate-900">4.03M users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Annual Revenue Uplift:</span>
                    <span className="font-semibold text-slate-900">$32-48M</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-green-300 text-base">
                    <span className="text-green-900 font-bold">ROI:</span>
                    <span className="font-bold text-green-600">3.8x - 5.6x</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-green-800">
                  Payback period: ~2.5 months. This is a high-conviction investment.
                </div>
              </div>
            </div>

            {/* Go/No-Go Framework */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Go/No-Go Decision Framework</h3>
              <div className="bg-orange-700/40 rounded-lg p-4 mb-4">
                <div className="font-semibold mb-2">End of Q1 2026 Checkpoint:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>GO: If pilot shows 6%+ conversion → Full rollout approved</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>PIVOT: If 4-6% conversion → Iterate, test new approaches</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>STOP: If less than 4% conversion → Kill experiment, reallocate budget</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-orange-100">
                <strong>Philosophy:</strong> Fail fast, learn faster. Better to kill 5 bad experiments in Q1 
                than waste 6 months on something that won't work.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YahooDAUDashboard;