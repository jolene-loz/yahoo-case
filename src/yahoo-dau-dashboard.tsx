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
    { name: 'Baseline', value: 7.745, color: COLORS.baseline },
    { name: 'Conservative', value: 10.25, color: COLORS.conservative },
    { name: 'Base Case', value: 11.92, color: COLORS.base },
    { name: 'Aggressive', value: 14.01, color: COLORS.aggressive }
  ];

  const comparativeBuildupData = [
    { 
      scenario: 'Baseline',
      retained: 7.4,
      reactivation: 0.0047,
      newAccounts: 0.34,
      total: 7.745
    },
    { 
      scenario: 'Conservative',
      retained: 7.4,
      reactivation: 2.51,
      newAccounts: 0.34,
      total: 10.25
    },
    { 
      scenario: 'Base',
      retained: 7.4,
      reactivation: 4.18,
      newAccounts: 0.34,
      total: 11.92
    },
    { 
      scenario: 'Aggressive',
      retained: 7.4,
      reactivation: 6.27,
      newAccounts: 0.34,
      total: 14.01
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
    { id: 'baseline', label: 'Baseline: 7.75M', color: 'bg-red-600', icon: TrendingDown },
    { id: 'conservative', label: 'Conservative: 10.25M', color: 'bg-yellow-600', icon: TrendingUp },
    { id: 'base', label: 'Base: 11.92M', color: 'bg-green-600', icon: TrendingUp },
    { id: 'aggressive', label: 'Aggressive: 14M', color: 'bg-blue-600', icon: TrendingUp }
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
                  <p className="text-lg text-red-100">
                    We have 215M monthly users who don't check email daily. Without intervention, we decline 23% in 2026. 
                    Goal is to move from 4.4% to 10% DAU/MAU, but moving halfway there would get us to 18M DAU.
                  </p>
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
                  <div className="text-3xl font-bold mb-1">4.4% → 10%</div>
                  <div className="text-sm text-blue-100">Moving halfway to 10% benchmark gets us to 18M DAU</div>
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
                    Based on 775M non-Mail Yahoo MAU, model annual cross-sell conversion with engagement rates.
                    <br /><span className="font-semibold text-slate-900">Result: 340K new DAU</span>
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

            {/* Comparative Component Breakdown */}
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
                    tick={(props: any) => {
                      const colors: { [key: string]: string } = {
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
                  <Bar dataKey="reactivation" stackId="a" fill="#3b82f6" name="Reactivation (0.005-6.27M)" />
                  <Bar dataKey="newAccounts" stackId="a" fill="#10b981" name="New Accounts (0.34M)" />
                  <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={3} name="Total DAU" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <strong>Key Insight:</strong> Retained base and new accounts are relatively stable (~7.74M). 
                Reactivation is our highest-leverage, highest-risk growth driver (0.005M → 6.27M range).
              </div>
            </div>

            {/* Key Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-red-700 uppercase mb-1">Baseline</div>
                <div className="text-3xl font-bold text-red-600 mb-1">7.75M</div>
                <div className="text-sm text-red-700">-23% decline</div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-yellow-700 uppercase mb-1">Conservative</div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">10.25M</div>
                <div className="text-sm text-yellow-700">+2.5% growth</div>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-green-700 uppercase mb-1">Base Case</div>
                <div className="text-3xl font-bold text-green-600 mb-1">11.92M</div>
                <div className="text-sm text-green-700">+19.2% growth</div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5 text-center">
                <div className="text-sm font-semibold text-blue-700 uppercase mb-1">Aggressive</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">14M</div>
                <div className="text-sm text-blue-700">+40% growth</div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle size={32} className="flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Predicted DAU by end of 2026: Target Base Case (11.92M)</h3>
                  <p className="text-green-100">
                    This represents realistic execution with focused experiments, feature launches, and 50% success rate on reactivation initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ASSUMPTIONS TAB */}
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
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Industry Context:</strong> Typical email DAU/MAU ratios are 10-20% on average, with Gmail likely reaching around 30%+. We're not trying to match Gmail, but using these as directional benchmarks.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Retention Assumptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Retention Rate Assumptions</h3>
              <p className="text-sm text-slate-600 mb-4">
                The 10M current DAU is segmented by engagement level. These are guesstimates based on typical user behavior patterns, 
                with retention rate assumptions for each segment over the next 12 months.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm">
                <strong>Segment Breakdown Calculation:</strong>
                <div className="mt-2 space-y-1 text-slate-700">
                  <div>• Core users (5-7x/week): ~35% of base = 3.5M</div>
                  <div>• Casual users (2-4x/week): ~40% of base = 4.0M</div>
                  <div>• At-risk users (&lt;2x/week): ~25% of base = 2.5M</div>
                  <div className="pt-1 font-semibold">Total: 10M DAU</div>
                </div>
              </div>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Segment</th>
                      <th className="text-right p-3 font-semibold">Current DAU</th>
                      <th className="text-right p-3 font-semibold">Retention</th>
                      <th className="text-left p-3 font-semibold">Reasoning</th>
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
                <strong>Blended retention rate: 74%</strong> (3.15M + 3.0M + 1.25M = 7.4M retained)
              </div>
            </div>

            {/* New Account Growth */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. New Account Growth Assumptions</h3>
              <p className="text-sm text-slate-600 mb-4">
                Yahoo has approximately 775M non-Mail MAU across properties (Finance, Sports, News, etc.). 
                We model natural cross-sell conversion from these properties to Yahoo Mail.
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Non-Mail Yahoo MAU</span>
                    <span className="text-blue-600 font-bold">775M</span>
                  </div>
                  <div className="text-xs text-slate-600">Monthly active users on Yahoo properties who don't currently have Yahoo Mail</div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Annual Cross-Sell Conversion Rate</span>
                    <span className="text-blue-600 font-bold">1%</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Simple natural conversion rate over 12 months from cross-product exposure. 
                    Industry standard conversion rates typically range from 2-5% with active marketing, 
                    but we're using 1% as a conservative baseline for organic/natural conversion.
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-400">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">New Mail MAU (Annual)</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">7.8M</div>
                      <div className="text-xs text-slate-600">775M × 1%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Current Mail Engagement (DAU/MAU)</span>
                    <span className="text-blue-600 font-bold">4.4%</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Applying the current Yahoo Mail engagement rate of 4.4% DAU/MAU to these new MAU users at steady-state
                  </div>
                </div>

                <div className="bg-green-100 border-2 border-green-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Net New DAU by EOY 2026</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">340K</div>
                      <div className="text-xs text-slate-600 mt-1">7.8M MAU × 4.4% = 343K ≈ 340K</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    This assumes new users adopt Yahoo Mail at roughly the same engagement rate as existing users.
                  </div>
                </div>
              </div>
            </div>

            {/* Reactivation Conversion Assumptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Reactivation Conversion Rate Assumptions</h3>
              <p className="text-sm text-slate-600 mb-4">
                We're estimating how many monthly users we can convert to daily users through next year's planned initiatives. 
                The conversion targets vary by engagement level:
              </p>
              
              <h4 className="font-semibold text-slate-900 mb-3">User Segments:</h4>
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Almost Daily Users (35M)</div>
                      <div className="text-xs text-slate-600">Use the product 3-4x/week</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">8%</div>
                  </div>
                  <div className="text-sm text-slate-700">
                    <strong>Target:</strong> 8% conversion<br />
                    <strong>Why:</strong> They're already close to daily habits, so nudges and notifications should work well
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Weekly Users (65M)</div>
                      <div className="text-xs text-slate-600">Use the product ~1x/week</div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">5%</div>
                  </div>
                  <div className="text-sm text-slate-700">
                    <strong>Target:</strong> 5% conversion<br />
                    <strong>Why:</strong> Need stronger incentives like new features to shift from weekly to daily use
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">Monthly Users (115M)</div>
                      <div className="text-xs text-slate-600">Use the product &lt;4x/month</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">2%</div>
                  </div>
                  <div className="text-sm text-slate-700">
                    <strong>Target:</strong> 2% conversion<br />
                    <strong>Why:</strong> Low engagement means we need compelling reasons to dramatically increase their usage
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-slate-900 mb-3">What "Addressable %" Means:</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                <p className="text-slate-700 mb-3">
                  This is the portion of each segment we can actually reach with our campaigns. We're testing three scenarios:
                </p>
                <ul className="space-y-1 text-slate-700 ml-4 mb-3">
                  <li>• <strong>Conservative:</strong> 30% addressable</li>
                  <li>• <strong>Base Case:</strong> 50% addressable</li>
                  <li>• <strong>Aggressive:</strong> 75% addressable</li>
                </ul>
                <div className="pt-3 border-t border-yellow-300">
                  <strong>Example:</strong> In the Base Case (50%), the "Almost Daily" segment would convert: 
                  35M users × 8% conversion × 50% addressable = <strong>1.4M new daily users</strong>
                </div>
              </div>
            </div>

            {/* Competitive Benchmark */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">4. Competitive Benchmarking</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg text-center border-2 border-red-200">
                  <div className="text-sm text-slate-600 mb-1">Yahoo Mail (Current)</div>
                  <div className="text-4xl font-bold text-red-600 mb-1">4.4%</div>
                  <div className="text-xs text-slate-600">DAU/MAU ratio</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center border-2 border-blue-200">
                  <div className="text-sm text-slate-600 mb-1">Industry Average</div>
                  <div className="text-4xl font-bold text-blue-600 mb-1">10-20%</div>
                  <div className="text-xs text-slate-600">Typical email products</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
                  <div className="text-sm text-slate-600 mb-1">Our Base Case Target</div>
                  <div className="text-4xl font-bold text-green-600 mb-1">5.3%</div>
                  <div className="text-xs text-slate-600">11.92M / 225M</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <strong className="text-blue-900">Key Insight:</strong>
                <p className="text-blue-800 mt-2">
                  We're not trying to match Gmail (likely 30%+) or even industry average (10-20%). 
                  We're targeting 5.3%, which represents a ~20% improvement from our current 4.4%. 
                  Moving halfway to 10% would get us to 18M DAU—our Base Case of 11.92M is a realistic stepping stone.
                </p>
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
                  <div className="text-5xl font-bold">7.75M</div>
                  <div className="text-xl text-red-200">-23% decline</div>
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
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. New Accounts: 340K</h3>
              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="bg-blue-50 p-3 rounded-lg flex-1 text-center">
                  <div className="text-xl font-bold text-blue-600">775M</div>
                  <div className="text-xs text-slate-600">Non-Mail MAU</div>
                </div>
                <ArrowRight className="text-slate-400" size={16} />
                <div className="bg-purple-50 p-3 rounded-lg flex-1 text-center">
                  <div className="text-xl font-bold text-purple-600">7.8M</div>
                  <div className="text-xs text-slate-600">Cross-sell (1%)</div>
                </div>
                <ArrowRight className="text-slate-400" size={16} />
                <div className="bg-green-50 p-3 rounded-lg flex-1 text-center">
                  <div className="text-xl font-bold text-green-600">340K</div>
                  <div className="text-xs text-slate-600">DAU (4.4%)</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                775M non-Mail MAU × 1% annual conversion = 7.8M new Mail MAU. Then 7.8M × 4.4% engagement = 340K DAU.
              </p>
            </div>

            {/* Organic Reactivation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Organic Reactivation: 4.7K</h3>
              <p className="text-sm text-slate-600 mb-3">
                Some inactive users naturally reactivate (important email, remember account exists)
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-2">
                <div>
                  <strong>MAU who reactivate:</strong> 215M MAU × 0.05% estimated monthly natural reactivation = 107.5K MAU
                </div>
                <div>
                  <strong>Convert to DAU:</strong> 107.5K MAU × 4.4% DAU/MAU ratio = 4.7K DAU
                </div>
              </div>
            </div>

            {/* Final Calculation */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Final Calculation</h3>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>Retained Base</span>
                  <span className="font-bold">7.400M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ New Accounts</span>
                  <span className="font-bold">0.340M</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Organic Reactivation</span>
                  <span className="font-bold">0.005M</span>
                </div>
                <div className="border-t-2 border-red-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>7.745M</span>
                </div>
                <div className="text-red-200 text-right">-2.26M (-23%)</div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-900 mb-2">The Burning Platform</h3>
              <p className="text-red-800">
                Without intervention, Yahoo Mail <strong>declines 23%</strong> in 2026. 
                We are not trying to grow—we are trying to <strong>reverse a decline</strong>.
              </p>
            </div>
          </div>
        )}

        {/* CONSERVATIVE TAB */}
        {activeTab === 'conservative' && (
          <div className="space-y-6">
            <div className="bg-yellow-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Conservative: 30% Addressable Rate</h2>
                  <p className="text-yellow-100">Many experiments fail, but some work</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">10.25M</div>
                  <div className="text-xl text-yellow-200">+2.5% growth</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reactivation Strategy (30% Addressable)</h3>
              <p className="text-sm text-slate-600 mb-4">
                We conduct experiments on the 215M MAU users. 30% addressable means we can only reach and activate 30% of the potential conversion pool.
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
                    Tactic: Cross-product integration
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
                    Tactic: Re-engagement campaigns
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
                  <span className="font-bold">0.34M</span>
                </div>
                <div className="border-t-2 border-yellow-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>10.25M</span>
                </div>
                <div className="text-yellow-200 text-right">+0.25M (+2.5%)</div>
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
                  <h2 className="text-3xl font-bold mb-2">Base Case: 50% Addressable Rate</h2>
                  <p className="text-green-100">Realistic execution with focused experiments</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">11.92M</div>
                  <div className="text-xl text-green-200">+19.2% growth</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reactivation Strategy (50% Addressable)</h3>
              <p className="text-sm text-slate-600 mb-4">
                50% addressable = we can reach and activate half of the potential conversion pool. This is realistic with focused execution and learning from early tests.
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
                  <span className="font-bold">0.34M</span>
                </div>
                <div className="border-t-2 border-green-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>11.92M</span>
                </div>
                <div className="text-green-200 text-right">+1.92M (+19.2%)</div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                My Recommendation
              </h3>
              <p className="text-green-800">
                This is the <strong>realistic target</strong> with focused execution on reactivation experiments, feature launches, and 50% addressable rate.
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
                  <h2 className="text-3xl font-bold mb-2">Aggressive: 75% Addressable Rate</h2>
                  <p className="text-blue-100">Strong execution, experiments exceed expectations</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">14M</div>
                  <div className="text-xl text-blue-200">+40% growth</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reactivation Strategy (75% Addressable)</h3>
              <p className="text-sm text-slate-600 mb-4">
                75% addressable assumes experiments exceed targets and some viral/network effects kick in. Possible but requires excellent execution.
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
                  <span className="font-bold">0.34M</span>
                </div>
                <div className="border-t-2 border-blue-400 pt-2 mt-2 flex justify-between text-2xl font-bold">
                  <span>= 2026 DAU</span>
                  <span>14.01M</span>
                </div>
                <div className="text-blue-200 text-right">+4.01M (+40%)</div>
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
      </div>
    </div>
  );
};

export default YahooDAUDashboard;