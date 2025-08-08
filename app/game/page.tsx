'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Zap, Trophy, Star, CheckCircle, XCircle, Target, Flame } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "ما هي عاصمة المملكة العربية السعودية؟",
    options: ["جدة", "الرياض", "الدمام", "مكة المكرمة"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "كم عدد أيام السنة الميلادية العادية؟",
    options: ["364", "365", "366", "367"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "ما هو أكبر محيط في العالم؟",
    options: ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ", "المحيط المتجمد"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "من هو مؤلف رواية 'مئة عام من العزلة'؟",
    options: ["غابرييل غارسيا ماركيز", "بابلو نيرودا", "خورخي لويس بورخيس", "إيزابيل الليندي"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "ما هو العنصر الكيميائي الذي رمزه Au؟",
    options: ["الفضة", "الذهب", "النحاس", "البلاتين"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "في أي قارة تقع دولة البرازيل؟",
    options: ["آسيا", "أفريقيا", "أمريكا الجنوبية", "أوروبا"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "كم عدد ألوان قوس قزح؟",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "ما هي أصغر دولة في العالم؟",
    options: ["موناكو", "سان مارينو", "الفاتيكان", "ليختنشتاين"],
    correctAnswer: 2
  }
]

export default function GamePage() {
  const [team1Name, setTeam1Name] = useState('')
  const [team2Name, setTeam2Name] = useState('')
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [team1Answer, setTeam1Answer] = useState<number | null>(null)
  const [team2Answer, setTeam2Answer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [team1DoubleUsed, setTeam1DoubleUsed] = useState(false)
  const [team2DoubleUsed, setTeam2DoubleUsed] = useState(false)
  const [team1DoubleActive, setTeam1DoubleActive] = useState(false)
  const [team2DoubleActive, setTeam2DoubleActive] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showCountdown, setShowCountdown] = useState(true)
  const [countdown, setCountdown] = useState(3)
  const [questionTransition, setQuestionTransition] = useState(false)
  const [scoreAnimation, setScoreAnimation] = useState({ team1: false, team2: false })

  useEffect(() => {
    const t1 = localStorage.getItem('team1Name') || 'المتنافس الأول'
    const t2 = localStorage.getItem('team2Name') || 'المتنافس الثاني'
    setTeam1Name(t1)
    setTeam2Name(t2)
    setMounted(true)
  }, [])

  // Countdown effect
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (showCountdown && countdown === 0) {
      setTimeout(() => {
        setShowCountdown(false)
      }, 1000)
    }
  }, [countdown, showCountdown])

  const currentQuestion = questions[currentQuestionIndex]

  const handleTeam1Answer = (answerIndex: number) => {
    if (showResult || showCountdown) return
    setTeam1Answer(answerIndex)
  }

  const handleTeam2Answer = (answerIndex: number) => {
    if (showResult || showCountdown) return
    setTeam2Answer(answerIndex)
  }

  const handleSubmitAnswers = () => {
    if (team1Answer === null || team2Answer === null) return

    const team1Correct = team1Answer === currentQuestion.correctAnswer
    const team2Correct = team2Answer === currentQuestion.correctAnswer

    let roundWinner = null

    if (team1Correct && !team2Correct) {
      const points = team1DoubleActive ? 2 : 1
      setTeam1Score(prev => prev + points)
      setScoreAnimation(prev => ({ ...prev, team1: true }))
      roundWinner = team1Name
    } else if (team2Correct && !team1Correct) {
      const points = team2DoubleActive ? 2 : 1
      setTeam2Score(prev => prev + points)
      setScoreAnimation(prev => ({ ...prev, team2: true }))
      roundWinner = team2Name
    } else if (team1Correct && team2Correct) {
      const team1Points = team1DoubleActive ? 2 : 1
      const team2Points = team2DoubleActive ? 2 : 1
      setTeam1Score(prev => prev + team1Points)
      setTeam2Score(prev => prev + team2Points)
      setScoreAnimation({ team1: true, team2: true })
      roundWinner = "كلاهما"
    }

    setWinner(roundWinner)
    setShowResult(true)
    setTeam1DoubleActive(false)
    setTeam2DoubleActive(false)

    // Reset score animation after delay
    setTimeout(() => {
      setScoreAnimation({ team1: false, team2: false })
    }, 2000)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setQuestionTransition(true)
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1)
          setTeam1Answer(null)
          setTeam2Answer(null)
          setShowResult(false)
          setWinner(null)
          setShowCountdown(true)
          setCountdown(3)
          setQuestionTransition(false)
        }, 1000)
      } else {
        setGameEnded(true)
      }
    }, 3000)
  }

  const handleTeam1Double = () => {
    if (!team1DoubleUsed) {
      setTeam1DoubleUsed(true)
      setTeam1DoubleActive(true)
    }
  }

  const handleTeam2Double = () => {
    if (!team2DoubleUsed) {
      setTeam2DoubleUsed(true)
      setTeam2DoubleActive(true)
    }
  }

  const goBack = () => {
    window.location.href = '/setup'
  }

  const goToResults = () => {
    localStorage.setItem('team1Score', team1Score.toString())
    localStorage.setItem('team2Score', team2Score.toString())
    window.location.href = '/results'
  }

  if (!mounted) return null

  if (gameEnded) {
    goToResults()
    return null
  }

  const bothAnswered = team1Answer !== null && team2Answer !== null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-gray-300/30 to-gray-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-gray-400/30 to-gray-500/30 rounded-full blur-3xl animate-float delay-1000"></div>
      </div>

      {/* Countdown Overlay */}
      {showCountdown && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center animate-scale-in">
            {countdown > 0 ? (
              <>
                <div className="relative mb-8">
                  <Target className="w-32 h-32 mx-auto text-gray-300 animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-black text-white animate-bounce-slow">
                      {countdown}
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
                  استعدوا للسؤال التالي!
                </h2>
              </>
            ) : (
              <>
                <Flame className="w-24 h-24 mx-auto text-orange-400 animate-bounce mb-6" />
                <h2 className="text-6xl font-black text-white animate-pulse">
                  ابدأوا! 🔥
                </h2>
              </>
            )}
          </div>
        </div>
      )}

      {/* Question Transition */}
      {questionTransition && (
        <div className="fixed inset-0 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center z-40 animate-fade-in">
          <div className="text-center animate-scale-in">
            <Star className="w-20 h-20 mx-auto text-gray-300 animate-spin mb-6" />
            <h2 className="text-4xl font-bold text-white">
              السؤال التالي قادم...
            </h2>
          </div>
        </div>
      )}

      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-fade-in-up">
            <Button
              onClick={goBack}
              variant="outline"
              className="bg-white/90 border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 transition-all duration-300 hover:scale-105 transform"
            >
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة
            </Button>

            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-gray-300 animate-pulse-slow">
                <span className="text-gray-600 font-semibold">السؤال</span>
                <span className="text-2xl font-bold text-gray-900 mx-2">{currentQuestionIndex + 1}</span>
                <span className="text-gray-600 font-semibold">من {questions.length}</span>
              </div>
            </div>

            <div className="w-20"></div>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-6 mb-8 animate-fade-in-up delay-200">
            <Card className={`bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-xl border border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform ${scoreAnimation.team1 ? 'animate-score-bounce' : ''}`}>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{team1Name}</h3>
                <div className={`text-4xl font-black text-gray-800 mb-2 transition-all duration-500 ${scoreAnimation.team1 ? 'scale-125 text-green-600' : ''}`}>
                  {team1Score}
                </div>
                <div className="text-gray-600 font-semibold">نقطة</div>
                {team1DoubleActive && (
                  <div className="mt-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    مضاعف نشط! ⚡
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-xl border border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform ${scoreAnimation.team2 ? 'animate-score-bounce' : ''}`}>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{team2Name}</h3>
                <div className={`text-4xl font-black text-gray-800 mb-2 transition-all duration-500 ${scoreAnimation.team2 ? 'scale-125 text-green-600' : ''}`}>
                  {team2Score}
                </div>
                <div className="text-gray-600 font-semibold">نقطة</div>
                {team2DoubleActive && (
                  <div className="mt-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    مضاعف نشط! ⚡
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Question */}
          <Card className={`bg-white/95 backdrop-blur-2xl border border-gray-300 shadow-2xl mb-8 animate-fade-in-up delay-400 transform transition-all duration-500 ${questionTransition ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
            <CardHeader>
              <CardTitle className="text-center text-gray-900">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-gray-700 animate-spin-slow" />
                  <span className="text-2xl md:text-3xl font-bold">السؤال</span>
                  <Star className="w-8 h-8 text-gray-700 animate-spin-slow" />
                </div>
                <div className="text-xl md:text-2xl leading-relaxed text-gray-800 font-semibold animate-fade-in-up">
                  {currentQuestion.question}
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Players sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Team 1 */}
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-xl border-2 border-gray-300 shadow-xl animate-fade-in-up delay-500 transform hover:scale-102 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center text-gray-900 text-xl font-bold flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 animate-bounce-slow" />
                  {team1Name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTeam1Answer(index)}
                    disabled={showResult || showCountdown}
                    className={`w-full p-4 text-right text-lg transition-all duration-300 transform hover:scale-102 ${
                      team1Answer === index
                        ? 'bg-gray-800 hover:bg-gray-900 text-white scale-105 shadow-lg animate-pulse'
                        : showResult && index === currentQuestion.correctAnswer
                        ? 'bg-green-600 text-white animate-bounce'
                        : showResult && team1Answer === index && index !== currentQuestion.correctAnswer
                        ? 'bg-red-600 text-white animate-shake'
                        : 'bg-white/90 hover:bg-gray-100 text-gray-800 border border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      <span className="font-bold text-gray-600">{String.fromCharCode(65 + index)}</span>
                    </div>
                  </Button>
                ))}
                
                <div className="pt-4">
                  <Button
                    onClick={handleTeam1Double}
                    disabled={team1DoubleUsed || showResult || showCountdown}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold disabled:opacity-50 transition-all duration-300 hover:scale-105 transform"
                  >
                    <Zap className="ml-2 h-4 w-4 animate-bounce" />
                    {team1DoubleUsed ? 'تم استخدام المضاعف' : 'مضاعف النقاط'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team 2 */}
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-xl border-2 border-gray-300 shadow-xl animate-fade-in-up delay-600 transform hover:scale-102 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center text-gray-900 text-xl font-bold flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 animate-bounce-slow" />
                  {team2Name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTeam2Answer(index)}
                    disabled={showResult || showCountdown}
                    className={`w-full p-4 text-right text-lg transition-all duration-300 transform hover:scale-102 ${
                      team2Answer === index
                        ? 'bg-gray-800 hover:bg-gray-900 text-white scale-105 shadow-lg animate-pulse'
                        : showResult && index === currentQuestion.correctAnswer
                        ? 'bg-green-600 text-white animate-bounce'
                        : showResult && team2Answer === index && index !== currentQuestion.correctAnswer
                        ? 'bg-red-600 text-white animate-shake'
                        : 'bg-white/90 hover:bg-gray-100 text-gray-800 border border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      <span className="font-bold text-gray-600">{String.fromCharCode(65 + index)}</span>
                    </div>
                  </Button>
                ))}
                
                <div className="pt-4">
                  <Button
                    onClick={handleTeam2Double}
                    disabled={team2DoubleUsed || showResult || showCountdown}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold disabled:opacity-50 transition-all duration-300 hover:scale-105 transform"
                  >
                    <Zap className="ml-2 h-4 w-4 animate-bounce" />
                    {team2DoubleUsed ? 'تم استخدام المضاعف' : 'مضاعف النقاط'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit button */}
          <div className="text-center animate-fade-in-up delay-700">
            <Button
              onClick={handleSubmitAnswers}
              disabled={!bothAnswered || showResult || showCountdown}
              className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold text-xl px-12 py-4 rounded-2xl disabled:opacity-50 transition-all duration-300 hover:scale-110 shadow-xl transform"
            >
              {bothAnswered ? 'تأكيد الإجابات ✨' : 'في انتظار الإجابات...'}
            </Button>
          </div>

          {/* Result Modal */}
          {showResult && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <Card className="bg-white/95 backdrop-blur-xl max-w-lg mx-4 shadow-2xl border border-gray-300 animate-scale-in transform">
                <CardContent className="p-8 text-center">
                  {winner === "كلاهما" ? (
                    <div className="text-gray-800">
                      <div className="flex justify-center gap-4 mb-6">
                        <Trophy className="w-16 h-16 animate-bounce text-gray-700" />
                        <Trophy className="w-16 h-16 animate-bounce delay-200 text-gray-700" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 animate-pulse">كلاهما أجاب بشكل صحيح! 🎉</h3>
                      <p className="text-xl text-gray-600">
                        نقطة لكل متنافس
                      </p>
                    </div>
                  ) : winner ? (
                    <div className="text-gray-800">
                      <CheckCircle className="w-20 h-20 mx-auto mb-6 animate-bounce text-green-600" />
                      <h3 className="text-3xl font-bold mb-4 animate-pulse">🎉 {winner} يفوز!</h3>
                      <p className="text-xl text-gray-600">
                        إجابة صحيحة وسريعة ⚡
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-800">
                      <XCircle className="w-20 h-20 mx-auto mb-6 animate-pulse text-red-600" />
                      <h3 className="text-3xl font-bold mb-4">لا يوجد فائز 😔</h3>
                      <p className="text-xl text-gray-600">
                        الإجابة الصحيحة: {currentQuestion.options[currentQuestion.correctAnswer]}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
