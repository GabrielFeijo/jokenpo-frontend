import { useGameStore } from "@/store/gameStore"
import { User } from "@/types/game"
import { motion } from "framer-motion"
import { Users, Swords } from "lucide-react"

const RoomStatus = ({ opponentPlayer, handleLeaveGame }: { opponentPlayer?: User, handleLeaveGame: () => void }) => {
    const { currentRoom, gameMode, setShowRules } = useGameStore()

    return (
        <motion.div
            className="fixed left-4 bottom-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 text-white border border-white/10 shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
        >
            <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-semibold">Sala: {currentRoom?.inviteCode}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Users size={14} />
                    <span>Jogadores: {currentRoom?.players.length}/2</span>
                </div>
                {opponentPlayer && (
                    <div className="flex items-center space-x-2">
                        <Swords size={14} />
                        <span>Vs: {opponentPlayer.name || 'Adversário'}</span>
                    </div>
                )}
                <div className="text-xs opacity-75 bg-white/10 px-2 py-1 rounded">
                    {gameMode === 'CLASSIC' ? '🎯 Clássico' : '⚡ Estendido'}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, rotateX: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRules(true)}
                    className="
            bg-gradient-to-r from-purple-600 to-indigo-600 
            px-8 py-1 rounded font-bold uppercase tracking-wider text-white 
            transition-all duration-300 shadow-2xl
            hover:from-purple-700 hover:to-indigo-700
            border-2 border-white/20 block
        "
                >
                    Regras
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05, rotateX: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLeaveGame}
                    className="
            bg-gradient-to-r from-red-600 to-pink-600 
            px-11 py-1 rounded font-bold text-white 
            transition-all duration-300 shadow-2xl
            hover:from-red-700 hover:to-pink-700
            border-2 border-white/20 block
        "
                >
                    SAIR
                </motion.button>
            </div>
        </motion.div>
    )
}

export default RoomStatus