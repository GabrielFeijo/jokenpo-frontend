import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import ChoiceButton from "./choice-button"
import { useGameStore } from "@/store/gameStore"

const RevealScreen = ({ handlePlayAgain }: { handlePlayAgain: () => void }) => {
    const { myChoice, opponentChoice, gameResult } = useGameStore()

    return (
        <motion.div
            className="space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-red-600/20 rounded-3xl blur-2xl" />

                <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                    <div className="grid grid-cols-2 gap-8 md:gap-16 items-center">
                        <motion.div
                            className="space-y-6 text-center"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <div className="text-lg font-bold uppercase tracking-wider text-blue-300">
                                Sua Escolha
                            </div>
                            <div className="flex justify-center">
                                {myChoice && (
                                    <ChoiceButton
                                        choice={myChoice}
                                        onClick={() => { }}
                                        disabled={true}
                                        size="large"
                                        showResult={!!gameResult}
                                        isWinner={gameResult === 'WIN'}
                                    />
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            className="w-fit absolute top-1/2 left-1/2 !-translate-x-1/2"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-white shadow-2xl">
                                <span className="text-white font-bold text-lg">VS</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="space-y-6 text-center"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <div className="text-lg font-bold uppercase tracking-wider text-red-300">
                                Oponente
                            </div>
                            <div className="flex justify-center">
                                {opponentChoice ? (
                                    <ChoiceButton
                                        choice={opponentChoice}
                                        onClick={() => { }}
                                        disabled={true}
                                        size="large"
                                        showResult={!!gameResult}
                                        isWinner={gameResult === 'LOSE'}
                                    />
                                ) : (
                                    <motion.div
                                        className="h-36 w-36 md:h-44 md:w-44 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-4 border-white/20"
                                        animate={{
                                            rotate: [0, 360],
                                            scale: [0.9, 1.1, 0.9],
                                        }}
                                        transition={{
                                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                    >
                                        <div className="text-white text-4xl">?</div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {gameResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="text-center space-y-6"
                    >
                        <motion.div
                            className={`
                        text-6xl md:text-8xl font-black uppercase tracking-wider
                        ${gameResult === 'WIN' ? 'text-green-400' :
                                    gameResult === 'LOSE' ? 'text-red-400' : 'text-yellow-400'}
                    `}
                            animate={{
                                scale: [1, 1.1, 1],
                                textShadow: [
                                    `0 0 20px ${gameResult === 'WIN' ? 'rgba(34,197,94,0.7)' :
                                        gameResult === 'LOSE' ? 'rgba(239,68,68,0.7)' : 'rgba(251,191,36,0.7)'}`,
                                    `0 0 40px ${gameResult === 'WIN' ? 'rgba(34,197,94,1)' :
                                        gameResult === 'LOSE' ? 'rgba(239,68,68,1)' : 'rgba(251,191,36,1)'}`,
                                    `0 0 20px ${gameResult === 'WIN' ? 'rgba(34,197,94,0.7)' :
                                        gameResult === 'LOSE' ? 'rgba(239,68,68,0.7)' : 'rgba(251,191,36,0.7)'}`,
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {gameResult === 'WIN' && 'VITÓRIA!'}
                            {gameResult === 'LOSE' && 'DERROTA!'}
                            {gameResult === 'DRAW' && 'EMPATE!'}
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                        >
                            {gameResult === 'WIN' && (
                                <div className="text-8xl">🏆</div>
                            )}
                            {gameResult === 'LOSE' && (
                                <div className="text-8xl">💀</div>
                            )}
                            {gameResult === 'DRAW' && (
                                <div className="text-8xl">🤝</div>
                            )}
                        </motion.div>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlayAgain}
                            className="
                        bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                        px-12 py-4 rounded-2xl text-xl font-bold uppercase tracking-wider 
                        text-white transition-all duration-300 shadow-2xl
                        hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
                        border-2 border-white/20
                    "
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="flex items-center space-x-3">
                                <Sparkles size={24} />
                                <span>Jogar Novamente</span>
                                <Sparkles size={24} />
                            </span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default RevealScreen