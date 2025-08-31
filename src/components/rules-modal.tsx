import { useGameStore } from '@/store/gameStore'
import { AnimatePresence, motion } from 'framer-motion'
import { Trophy, Zap, Crown } from 'lucide-react'

const RulesModal = () => {

    const { showRules, setShowRules, gameMode } = useGameStore()

    return (
        <AnimatePresence>
            {showRules && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setShowRules(false)}
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0, rotateY: -30 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0.7, opacity: 0, rotateY: 30 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black uppercase text-dark-text flex items-center space-x-3">
                                <Trophy className="text-yellow-500" size={32} />
                                <span>Regras</span>
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowRules(false)}
                                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                ✕
                            </motion.button>
                        </div>

                        <div className="space-y-6 text-dark-text">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
                                    <Zap className="text-blue-500" size={20} />
                                    <span>Como Jogar:</span>
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    {gameMode === 'CLASSIC' ? (
                                        <>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">📄</span>
                                                <span><strong>Papel</strong> vence Pedra</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">🪨</span>
                                                <span><strong>Pedra</strong> vence Tesoura</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">✂️</span>
                                                <span><strong>Tesoura</strong> vence Papel</span>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">🪨</span>
                                                <span><strong>Pedra</strong> vence Tesoura & Lagarto</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">📄</span>
                                                <span><strong>Papel</strong> vence Pedra & Spock</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">✂️</span>
                                                <span><strong>Tesoura</strong> vence Papel & Lagarto</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">🦎</span>
                                                <span><strong>Lagarto</strong> vence Spock & Papel</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <span className="text-2xl">🖖</span>
                                                <span><strong>Spock</strong> vence Tesoura & Pedra</span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                                <h4 className="font-bold mb-2 flex items-center space-x-2">
                                    <Crown className="text-green-500" size={18} />
                                    <span>Objetivo:</span>
                                </h4>
                                <p className="text-sm">
                                    Seja o primeiro a vencer seu oponente! Faça sua escolha
                                    estratégica e domine a arena!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default RulesModal