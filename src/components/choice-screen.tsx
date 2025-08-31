import { motion, AnimatePresence } from "framer-motion"
import { Timer } from "lucide-react"
import ChoiceButton from "./choice-button"
import { useGameStore } from "@/store/gameStore"
import { Choice } from "@/types/game"

const ChoiceScreen = ({ choices, showChoices, handleChoiceClick }: { choices: Choice[], showChoices: boolean, handleChoiceClick: (choice: Choice) => void }) => {
    const { myChoice, gameMode } = useGameStore()

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center">
                <motion.h2
                    className="text-4xl font-bold text-white mb-4"
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 30px rgba(255,255,255,0.8)",
                            "0 0 20px rgba(255,255,255,0.5)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Escolha sua Arma!
                </motion.h2>

                {myChoice && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30 max-w-md mx-auto"
                    >
                        <div className="text-green-300 text-sm mb-1">✓ Escolha confirmada:</div>
                        <div className="text-white text-lg font-bold capitalize">{myChoice}</div>
                        <motion.div
                            className="text-yellow-300 text-sm mt-2 flex items-center justify-center space-x-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        >
                            <Timer size={16} />
                            <span>Aguardando oponente...</span>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {showChoices && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-xl" />

                        <div className="relative bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                            <div
                                className={`grid justify-items-center gap-8 ${gameMode === 'CLASSIC'
                                    ? 'grid-cols-1 md:grid-cols-3'
                                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                                    }`}
                            >
                                {choices.map((choice, index) => (
                                    <motion.div
                                        key={choice}
                                        initial={{ opacity: 0, y: 30, rotateY: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                    >
                                        <ChoiceButton
                                            choice={choice}
                                            onClick={() => handleChoiceClick(choice)}
                                            disabled={!!myChoice}
                                            isSelected={myChoice === choice}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default ChoiceScreen