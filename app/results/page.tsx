'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Star, RotateCcw, Home, Sparkles, Crown } from 'lucide-react'

export default function ResultsPage() {
  const [team1Name, setTeam1Name] = useState('')
  const [team2Name, setTeam2Name] = useState('')
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t1 = localStorage.getItem('team1Name') || 'المتنافس الأول'
    const t2 = localStorage.getItem('team2Name') || 'المتنافس الثاني'
    const s1 = parseInt(localStorage.getItem('team1Score') || '0')
    const s2 = parseInt(localStorage.getItem('team2Score') || '0')
    
    setTeam1Name(t1)
    setTeam2Name(t2)
    setTeam1Score(s1)
    setTeam2Score(s2)
    setMounted(true)
    
    setTimeout(() => setShowAnimation(true), 500)
  }, [])

  const winner = team1Score > team2Score ? team1Name : team2Score > team1Score ? team2Name : null
  const isDraw = team1Score === team2Score

  const startNewGame = () => {
    localStorage.removeItem('team1Score')
    localStorage.removeItem('team2Score')
    window.location.href = '/setup'
  }

  const goHome = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-gray-300/40 to-gray-400/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-gray-400/40 to-gray-500/40 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/50 to-gray-300/50 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-1/4 w-8 h-8 text-gray-600 animate-float opacity-60" />
        <Star className="absolute top-40 right-1/3 w-6 h-6 text-gray-500 animate-float delay-500 opacity-60" />
        <Trophy className="absolute bottom-40 left-1/5 w-10 h-10 text-gray-700 animate-float delay-1000 opacity-60" />
        <Crown className="absolute bottom-20 right-1/4 w-8 h-8 text-gray-600 animate-float delay-1500 opacity-60" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <div className={`transform transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'}`}>
            
            {/* Winner announcement */}
            <div className="mb-12 animate-fade-in-up">
              {isDraw ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative">
                    <div className="flex justify-center gap-4 mb-8">
                      <Star className="w-20 h-20 text-gray-700 animate-spin-slow" />
                      <Star className="w-20 h-20 text-gray-600 animate-spin-slow delay-500" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 bg-clip-text text-transparent mb-6 animate-gradient-x">
                      تعادل مثير!
                    </h1>
                    <p className="text-2xl text-gray-700 font-semibold">
                      أداء رائع من كلا المتنافسين 🎊
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative">
                    <div className="mb-8">
                      <Crown className="w-24 h-24 mx-auto text-gray-800 animate-bounce-slow" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 animate-gradient-x">
                      البطل هو
                    </h1>
                    <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 bg-clip-text text-transparent mb-6 animate-pulse">
                      {winner}! 🏆
                    </h2>
                    <p className="text-2xl text-gray-700 font-semibold">
                      تهانينا على الفوز المستحق والأداء الرائع
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Final scores */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-in-up delay-500">
              <Card className={`group bg-white/80 backdrop-blur-2xl border border-gray-300 shadow-2xl transition-all duration-700 hover:scale-105 relative overflow-hidden ${
                team1Score > team2Score ? 'ring-4 ring-gray-600 shadow-gray-600/25' : ''
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 group-hover:from-gray-200/50 group-hover:to-gray-300/50 transition-all duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-gray-900 text-2xl font-bold flex items-center justify-center gap-3">
                    {team1Score > team2Score && <Crown className="w-8 h-8 text-gray-700 animate-bounce" />}
                    {team1Name}
                    {team1Score > team2Score && <Crown className="w-8 h-8 text-gray-700 animate-bounce" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-6xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 animate-pulse">
                    {team1Score}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">نقطة</div>
                  {team1Score > team2Score && (
                    <div className="mt-4 animate-bounce">
                      <Trophy className="w-8 h-8 mx-auto text-gray-700" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={`group bg-white/80 backdrop-blur-2xl border border-gray-300 shadow-2xl transition-all duration-700 hover:scale-105 relative overflow-hidden ${
                team2Score > team1Score ? 'ring-4 ring-gray-600 shadow-gray-600/25' : ''
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 group-hover:from-gray-200/50 group-hover:to-gray-300/50 transition-all duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-gray-900 text-2xl font-bold flex items-center justify-center gap-3">
                    {team2Score > team1Score && <Crown className="w-8 h-8 text-gray-700 animate-bounce" />}
                    {team2Name}
                    {team2Score > team1Score && <Crown className="w-8 h-8 text-gray-700 animate-bounce" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-6xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 animate-pulse">
                    {team2Score}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">نقطة</div>
                  {team2Score > team1Score && (
                    <div className="mt-4 animate-bounce">
                      <Trophy className="w-8 h-8 mx-auto text-gray-700" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-700">
              <Button
                onClick={startNewGame}
                className="group bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-gray-700/25 transition-all duration-500 hover:scale-110 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center">
                  <RotateCcw className="ml-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                  معركة جديدة
                </span>
              </Button>
              
              <Button
                onClick={goHome}
                variant="outline"
                className="group bg-white/90 border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 font-bold text-xl px-12 py-6 rounded-2xl transition-all duration-500 hover:scale-110 shadow-xl"
              >
                <span className="flex items-center">
                  <Home className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  الصفحة الرئيسية
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
