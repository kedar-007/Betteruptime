'use client'
import { Activity, Bell, BarChart3, Globe, Shield, Zap, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold text-gray-900">StatusWatch</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-gray-900 transition">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition">About</a>
              <button onClick={() => {
                router.push("/signup");
              }} className="bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition">
                Start Free Trial
              </button>
              <button onClick={() => {
                router.push("/signin");
              }} className="bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition">
                Sign In
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-gray-900 transition">Features</a>
              <a href="#pricing" className="block text-gray-700 hover:text-gray-900 transition">Pricing</a>
              <a href="#about" className="block text-gray-700 hover:text-gray-900 transition">About</a>
              <button className="block w-full text-left text-gray-700 hover:text-gray-900 transition">Sign In</button>
              <button className="block w-full bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition">
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Zap className="w-4 h-4" />
                <span>Lightning-fast monitoring for modern teams</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Keep your websites
                <span className="text-emerald-500"> always online</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Monitor your infrastructure, get instant alerts, and create beautiful status pages.
                Everything you need to keep your services running smoothly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="w-full sm:w-auto bg-emerald-500 text-white px-8 py-4 rounded-lg hover:bg-emerald-600 transition flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg shadow-emerald-500/30">
                  <span>Start monitoring for free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-50 transition border-2 border-gray-200 text-lg font-semibold">
                  View live demo
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>

            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-800">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-400 text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span>All systems operational</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {['API Server', 'Web Application', 'Database', 'CDN'].map((service, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-white font-medium">{service}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[...Array(30)].map((_, j) => (
                              <div key={j} className="w-1 h-8 bg-emerald-500 rounded-sm" style={{ height: `${20 + Math.random() * 12}px` }}></div>
                            ))}
                          </div>
                          <span className="text-emerald-400 text-sm font-medium">99.9%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Everything you need to monitor uptime
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features that help you stay on top of your infrastructure health
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Activity,
                  title: 'Real-time Monitoring',
                  description: 'Check your websites and APIs every 30 seconds from multiple locations worldwide.',
                  color: 'emerald'
                },
                {
                  icon: Bell,
                  title: 'Instant Alerts',
                  description: 'Get notified via email, SMS, Slack, or webhook the moment something goes wrong.',
                  color: 'blue'
                },
                {
                  icon: Globe,
                  title: 'Status Pages',
                  description: 'Beautiful public or private status pages to keep your users informed.',
                  color: 'purple'
                },
                {
                  icon: BarChart3,
                  title: 'Detailed Analytics',
                  description: 'Track response times, uptime percentages, and performance trends over time.',
                  color: 'orange'
                },
                {
                  icon: Shield,
                  title: 'SSL Monitoring',
                  description: 'Never let your SSL certificates expire. Get alerts before they expire.',
                  color: 'red'
                },
                {
                  icon: Zap,
                  title: 'Incident Management',
                  description: 'Manage incidents with timeline, root cause analysis, and post-mortems.',
                  color: 'yellow'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition duration-300 group">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Ready to ensure 99.9% uptime?
                </h2>
                <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
                  Join thousands of companies monitoring their infrastructure with StatusWatch
                </p>
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition text-lg font-semibold shadow-xl inline-flex items-center space-x-2">
                  <span>Get started free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-6 h-6 text-emerald-500" />
                  <span className="text-lg font-bold text-white">StatusWatch</span>
                </div>
                <p className="text-sm text-gray-400">
                  Monitor your infrastructure with confidence.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">Security</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-sm text-center text-gray-400">
              <p>&copy; 2025 StatusWatch. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
