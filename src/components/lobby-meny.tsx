import { motion } from "framer-motion"
import { Crown, Sword, Gamepad2 } from "lucide-react"
import { useNavigate } from "react-router-dom";

const LobbyMenu = ({ setMode }: { setMode: React.Dispatch<React.SetStateAction<"menu" | "create" | "join">> }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
        >
            <div className="text-center space-y-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-black uppercase tracking-wider bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(255,255,255,0.5)",
                                "0 0 40px rgba(255,255,255,0.8)",
                                "0 0 20px rgba(255,255,255,0.5)"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Rock Paper
                        <br />
                        Scissors
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex items-center justify-center space-x-6 text-4xl"
                    >
                        <motion.span
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        >
                            🪨
                        </motion.span>
                        <motion.span
                            animate={{
                                rotate: [0, -10, 10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        >
                            📄
                        </motion.span>
                        <motion.span
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        >
                            ✂️
                        </motion.span>
                    </motion.div>
                </motion.div>

                <motion.p
                    className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <span className="text-yellow-400 font-semibold">Que a sorte esteja com você!</span>
                </motion.p>
            </div>

            <motion.div
                className="mx-auto max-w-md space-y-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                <motion.button
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                        rotateX: 5,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMode('create')}
                    className="
                    group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                    rounded-2xl p-6 font-bold text-white transition-all duration-300 
                    shadow-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
                    border-2 border-white/20 relative overflow-hidden
                "
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="relative flex items-center justify-center space-x-3">
                        <span className="text-lg">Criar Nova Arena</span>
                        <Crown size={24} />
                    </div>
                </motion.button>

                <motion.button
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(34, 197, 94, 0.4)",
                        rotateX: 5,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMode('join')}
                    className="
                    group w-full bg-gradient-to-r from-green-600 to-emerald-600 
                    rounded-2xl p-6 font-bold text-white transition-all duration-300 
                    shadow-2xl hover:from-green-700 hover:to-emerald-700
                    border-2 border-white/20 relative overflow-hidden
                "
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="relative flex items-center justify-center space-x-3">
                        <span className="text-lg">Entrar na Batalha</span>
                        <Sword size={24} />
                    </div>
                </motion.button>

                <motion.button
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)",
                        rotateX: 5,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/dashboard')}
                    className="
                    group w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                    rounded-2xl p-6 font-bold text-white transition-all duration-300 
                    shadow-2xl hover:from-purple-700 hover:to-indigo-700
                    border-2 border-white/20 relative overflow-hidden
                "
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="relative flex items-center justify-center space-x-3">
                        <span className="text-lg">Estatísticas</span>
                        <Gamepad2 size={24} />
                    </div>
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default LobbyMenu