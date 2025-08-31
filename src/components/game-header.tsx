import { useGameStore } from "@/store/gameStore"
import { motion } from "framer-motion"

const GameHeader = () => {
    const { score, gameMode } = useGameStore()

    return (
        <motion.div
            className="container mx-auto px-4 py-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl">
                <motion.div
                    className="text-white"
                    whileHover={{ scale: 1.05 }}
                >
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                        Rock Paper
                        <br />
                        Scissors
                        {gameMode === 'EXTENDED' && (
                            <>
                                <br />
                                <span className="text-lg text-yellow-400">+ Lizard Spock</span>
                            </>
                        )}
                    </h1>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 text-center shadow-2xl border border-gray-200"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-sm font-bold uppercase tracking-wider text-score-text mb-2">
                        Score
                    </div>
                    <motion.div
                        className="text-4xl md:text-5xl font-black text-dark-text"
                        animate={{ scale: score > 0 ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {score}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default GameHeader