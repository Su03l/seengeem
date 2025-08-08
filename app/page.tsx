'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Users, Zap, ArrowRight, Sparkles, Star, Rocket, Target, Info, Heart, X } from 'lucide-react'

export default function HomePage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showFloatingElements, setShowFloatingElements] = useState(false)
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setShowFloatingElements(true), 1000)
  }, [])

  const handleStart = () => {
    setIsAnimating(true)
    setTimeout(() => {
      window.location.href = '/setup'
    }, 800)
  }

  const toggleDeveloperInfo = () => {
    setShowDeveloperInfo(!showDeveloperInfo)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-full blur-3xl animate-spin-slow"></div>
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

      {/* Floating animated elements */}
      {showFloatingElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 animate-float">
            <Sparkles className="w-8 h-8 text-gray-600 opacity-60 animate-spin-slow" />
          </div>
          <div className="absolute top-20 right-20 animate-float delay-500">
            <Star className="w-6 h-6 text-gray-500 opacity-60 animate-bounce-slow" />
          </div>
          <div className="absolute bottom-20 left-20 animate-float delay-1000">
            <Trophy className="w-10 h-10 text-gray-700 opacity-60 animate-pulse" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float delay-1500">
            <Target className="w-7 h-7 text-gray-600 opacity-50 animate-spin-slow" />
          </div>
          <div className="absolute bottom-1/3 left-1/4 animate-float delay-2000">
            <Rocket className="w-9 h-9 text-gray-500 opacity-60 animate-bounce-slow" />
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full text-center">
          <div className={`transform transition-all duration-800 ${isAnimating ? 'scale-95 opacity-0 translate-y-10' : 'scale-100 opacity-100 translate-y-0'}`}>
            
            {/* Hero Section */}
            <div className="mb-12 animate-fade-in-up">
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <Trophy className="relative w-24 h-24 mx-auto text-gray-800 animate-bounce-slow" />
                <div className="absolute -top-2 -right-2 animate-ping">
                  <Sparkles className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 animate-gradient-x leading-tight">
                معركة العقول
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-300">
                تحدى صديقك في مسابقة شيقة من الأسئلة والمعلومات العامة
                <br />
                <span className="text-gray-900 font-semibold animate-pulse">من الأسرع في الإجابة؟ ⚡</span>
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in-up delay-500">
              <Card className="group bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden transform">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gray-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <Users className="relative w-16 h-16 mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-500 animate-bounce-slow" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">تنافس مباشر</h3>
                  <p className="text-gray-600 leading-relaxed">كلا اللاعبين يجيبان على نفس السؤال، الأسرع يفوز!</p>
                </CardContent>
              </Card>

              <Card className="group bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden transform">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gray-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <Zap className="relative w-16 h-16 mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-500 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">مضاعف النقاط</h3>
                  <p className="text-gray-600 leading-relaxed">استخدم مضاعف النقاط مرة واحدة لمضاعفة فرصتك</p>
                </CardContent>
              </Card>

              <Card className="group bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden transform">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gray-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <Trophy className="relative w-16 h-16 mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-500 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">تحدي شيق</h3>
                  <p className="text-gray-600 leading-relaxed">أسئلة متنوعة ومثيرة تختبر معلوماتك العامة</p>
                </CardContent>
              </Card>
            </div>

            {/* Start Button */}
            <div className="animate-fade-in-up delay-700">
              <Button 
                onClick={handleStart}
                size="lg"
                className="group bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-800 text-white font-bold text-2xl px-16 py-8 rounded-2xl shadow-2xl hover:shadow-gray-800/25 transition-all duration-500 hover:scale-110 relative overflow-hidden border-0 transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1 -right-1 animate-ping opacity-75">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="relative z-10 flex items-center">
                  ابدأ المغامرة 🚀
                  <ArrowRight className="mr-3 h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
