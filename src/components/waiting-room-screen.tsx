import { useGameStore } from "@/store/gameStore"
import { User } from "@/types/game"
import { motion } from "framer-motion"
import { Users, Swords, Zap, Crown, Sparkles, Timer, Trophy } from "lucide-react"

const WaitingRoomScreen = ({ countdown, opponentPlayer, handleReadyClick }: { countdown: number, opponentPlayer?: User, handleReadyClick: () => void }) => {
    const { currentRoom, currentUser, isReady, opponentReady } = useGameStore()

    return (
        <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {currentRoom?.players.length === 1 ? (
                <div className="space-y-6">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Users size={64} className="mx-auto text-white/60 mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white">
                        Aguardando Desafiante...
                    </h2>
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="text-sm opacity-75 mb-2 text-white">
                            Compartilhe o código da sala:
                        </div>
                        <motion.div
                            className="text-4xl font-bold text-yellow-400 tracking-wider mb-4"
                            animate={{
                                textShadow: [
                                    "0 0 10px rgba(255,255,0,0.5)",
                                    "0 0 20px rgba(255,255,0,0.8)",
                                    "0 0 10px rgba(255,255,0,0.5)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {currentRoom.inviteCode}
                        </motion.div>
                        <div className="text-xs opacity-60 text-white p-2 bg-white/5 rounded-lg">
                            Ou compartilhe: {window.location.href}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                    >
                        <Swords size={80} className="mx-auto text-yellow-400 mb-4" />
                    </motion.div>

                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                        <h2 className="text-3xl font-bold text-white mb-4">Arena Completa!</h2>

                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                                    <span className="text-white font-bold">
                                        {currentUser?.name?.[0]?.toUpperCase() || 'P'}
                                    </span>
                                </div>
                                <span className="text-sm text-white">
                                    {currentUser?.name || 'Você'}
                                </span>
                            </div>

                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Zap size={24} className="text-yellow-400" />
                            </motion.div>

                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-2">
                                    <span className="text-white font-bold">
                                        {opponentPlayer?.name?.[0]?.toUpperCase() || 'O'}
                                    </span>
                                </div>
                                <span className="text-sm text-white">
                                    {opponentPlayer?.name || 'Oponente'}
                                </span>
                            </div>
                        </div>

                        {countdown ? (
                            <motion.div
                                className="text-center"
                                key={countdown}
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                            >
                                <div className="text-8xl font-bold text-yellow-400 mb-4">
                                    {countdown}
                                </div>
                                <div className="text-xl text-white">Prepare-se!</div>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05, rotateX: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReadyClick}
                                disabled={isReady}
                                className={`
                                w-full rounded-xl px-8 py-4 font-bold text-lg transition-all duration-300 transform-gpu
                                ${isReady
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default shadow-green-500/30'
                                        : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 shadow-yellow-500/30'
                                    } shadow-2xl
                            `}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {isReady ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <Crown size={24} />
                                        <span>Pronto para Batalha!</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center space-x-2">
                                        <Sparkles size={24} />
                                        <span>Estou Pronto!</span>
                                    </span>
                                )}
                            </motion.button>
                        )}

                        {isReady && !opponentReady && (
                            <motion.div
                                className="mt-4 text-yellow-300 flex items-center justify-center space-x-2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Timer size={20} />
                                <span>Aguardando oponente...</span>
                            </motion.div>
                        )}

                        {isReady && opponentReady && countdown === null && (
                            <motion.div
                                className="mt-4 text-green-300 flex items-center justify-center space-x-2"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    textShadow: [
                                        "0 0 10px rgba(0,255,0,0.5)",
                                        "0 0 20px rgba(0,255,0,0.8)",
                                        "0 0 10px rgba(0,255,0,0.5)"
                                    ]
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Trophy size={20} />
                                <span className="font-bold">Iniciando batalha...</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default WaitingRoomScreen