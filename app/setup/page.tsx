'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Users, Sparkles, Rocket, Home, Info, Heart, X } from 'lucide-react'

export default function SetupPage() {
  const [team1Name, setTeam1Name] = useState('')
  const [team2Name, setTeam2Name] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showRocket, setShowRocket] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStart = () => {
    if (team1Name.trim() && team2Name.trim()) {
      setIsAnimating(true)
      setShowRocket(true)
      localStorage.setItem('team1Name', team1Name.trim())
      localStorage.setItem('team2Name', team2Name.trim())
      
      setTimeout(() => {
        window.location.href = '/game'
      }, 2500)
    }
  }

  const goBack = () => {
    window.location.href = '/'
  }

  const toggleDeveloperInfo = () => {
    setShowDeveloperInfo(!showDeveloperInfo)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-gray-300/40 to-gray-400/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-gray-400/40 to-gray-500/40 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-gray-200/50 to-gray-300/50 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Developer Info Button - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          {/* Info Button */}
          <Button
            onClick={toggleDeveloperInfo}
            className="group bg-white/90 hover:bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform animate-fade-in-up delay-1200"
          >
            <Info className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Button>

          {/* Developer Info Card */}
          {showDeveloperInfo && (
            <div className="absolute top-16 right-0 animate-slide-in-right">
              <Card className="bg-white/95 backdrop-blur-xl border border-gray-300 shadow-2xl w-80 transform">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-gray-900">معلومات المطور</h3>
                    </div>
                    <Button
                      onClick={toggleDeveloperInfo}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 animate-fade-in-up delay-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">س</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">سليمان</p>
                        <p className="text-sm text-gray-600">مطور واجهات المستخدم</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 animate-fade-in-up delay-400">
                      <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                        صُنع بـ 
                        <Heart className="w-4 h-4 text-red-500 animate-heartbeat" />
                        في المملكة العربية السعودية
                      </p>
                      
                      <a 
                        href="https://twitter.com/su05l" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        <span className="font-semibold">تابعني على تويتر</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>

                    <div className="text-center pt-2 animate-fade-in-up delay-600">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Sparkles className="w-3 h-3 animate-spin-slow" />
                        <span>نسخة 1.0</span>
                        <Sparkles className="w-3 h-3 animate-spin-slow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Back to Home Button - Top Left */}
      <div className="absolute top-6 left-6 z-50">
        <Button
          onClick={goBack}
          className="group bg-white/90 hover:bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform animate-fade-in-up delay-300"
        >
          <Home className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">الصفحة الرئيسية</span>
        </Button>
      </div>

      {/* Rocket Animation */}
      {showRocket && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute bottom-10 left-10 animate-rocket-launch">
            <Rocket className="w-16 h-16 text-gray-800 transform rotate-45" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-sm animate-pulse opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-md animate-pulse opacity-60"></div>
          </div>
          
          {/* Launch Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-launch-text">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-8 py-6 shadow-2xl border border-gray-300">
              <h2 className="text-4xl font-black text-gray-900 text-center animate-pulse">
                🚀 يتم بدء المعركة!
              </h2>
              <p className="text-xl text-gray-600 text-center mt-2">
                استعدوا للتحدي...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className={`transform transition-all duration-800 ${isAnimating ? 'scale-95 opacity-0 translate-y-10' : 'scale-100 opacity-100 translate-y-0'}`}>
            
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <Users className="relative w-20 h-20 mx-auto text-gray-800 animate-bounce-slow" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
                إعداد المتنافسين
              </h1>
              <p className="text-xl text-gray-700 font-medium">
                أدخل أسماء اللاعبين لبدء المنافسة الشيقة
              </p>
            </div>

            {/* Setup Form */}
            <Card className="bg-white/90 backdrop-blur-2xl border border-gray-300 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden animate-fade-in-up delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-center text-gray-900 text-3xl font-bold flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 text-gray-600 animate-spin-slow" />
                  أسماء المتنافسين
                  <Sparkles className="w-8 h-8 text-gray-600 animate-spin-slow" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div className="space-y-3 group">
                  <label className="text-gray-800 font-bold text-xl block group-hover:text-gray-900 transition-colors duration-300">
                    🏆 المتنافس الأول
                  </label>
                  <Input
                    value={team1Name}
                    onChange={(e) => setTeam1Name(e.target.value)}
                    placeholder="أدخل اسم المتنافس الأول"
                    className="bg-white/90 border-2 border-gray-300 focus:border-gray-600 text-gray-900 placeholder:text-gray-500 text-lg py-4 px-6 rounded-xl transition-all duration-300 hover:bg-white focus:bg-white shadow-lg focus:shadow-xl transform hover:scale-102"
                    maxLength={20}
                  />
                </div>

                <div className="space-y-3 group">
                  <label className="text-gray-800 font-bold text-xl block group-hover:text-gray-900 transition-colors duration-300">
                    🎯 المتنافس الثاني
                  </label>
                  <Input
                    value={team2Name}
                    onChange={(e) => setTeam2Name(e.target.value)}
                    placeholder="أدخل اسم المتنافس الثاني"
                    className="bg-white/90 border-2 border-gray-300 focus:border-gray-600 text-gray-900 placeholder:text-gray-500 text-lg py-4 px-6 rounded-xl transition-all duration-300 hover:bg-white focus:bg-white shadow-lg focus:shadow-xl transform hover:scale-102"
                    maxLength={20}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={goBack}
                    variant="outline"
                    className="flex-1 bg-white/90 border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 transform"
                  >
                    <ArrowLeft className="ml-2 h-5 w-5" />
                    العودة
                  </Button>
                  
                  <Button
                    onClick={handleStart}
                    disabled={!team1Name.trim() || !team2Name.trim()}
                    className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-bold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center">
                      بدء المعركة
                      <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
