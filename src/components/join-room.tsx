import { useJoinRoom, useUpdateUser } from "@/hooks/useApi";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion"
import { Sword, Users, Shield, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JoinRoom = ({ playerName, setPlayerName, roomCode, setRoomCode, setMode }: { roomCode: string, setRoomCode: React.Dispatch<React.SetStateAction<string>>, playerName: string, setPlayerName: React.Dispatch<React.SetStateAction<string>>, setMode: React.Dispatch<React.SetStateAction<"menu" | "create" | "join">> }) => {

    const joinRoomMutation = useJoinRoom();
    const { currentUser, setUser } = useGameStore();
    const navigate = useNavigate();
    const updateUserMutation = useUpdateUser();


    const handleJoinRoom = async () => {
        if (!currentUser) {
            toast.error('Erro: usuário não encontrado');
            return;
        }

        if (!roomCode.trim()) {
            toast.error('Digite o código da sala');
            return;
        }

        if (playerName.trim()) {
            setUser({ ...currentUser, name: playerName.trim() });
            updateUserMutation.mutateAsync({ id: currentUser.id, name: playerName.trim() });
        }

        try {
            const response = await joinRoomMutation.mutateAsync({
                roomId: roomCode.trim().toUpperCase(),
                userId: currentUser.id,
            });

            navigate(`/game/${response.room.inviteCode}`, { replace: true });
        } catch (error) {
            console.error('Erro ao entrar na sala:', error);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-lg"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                    >
                        <Sword size={64} className="mx-auto text-green-400 mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Entrar na Arena</h2>
                    <p className="text-white/70">Junte-se à batalha épica</p>
                </div>

                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                            <Users size={16} />
                            <span>Seu nome de guerra (opcional)</span>
                        </label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Digite seu nome épico"
                            className="
                            w-full rounded-xl border-2 border-white/20 bg-black/20 backdrop-blur-sm 
                            p-4 text-white placeholder-white/50 transition-all duration-300 
                            focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400/20
                            hover:border-white/40
                        "
                            maxLength={20}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                            <Shield size={16} />
                            <span>Código da Arena</span>
                        </label>
                        <motion.input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="EX: ABC123"
                            className="
                            w-full rounded-xl border-2 border-white/20 bg-black/20 backdrop-blur-sm 
                            p-4 text-center text-2xl font-black uppercase tracking-widest 
                            text-yellow-400 placeholder-white/50 transition-all duration-300 
                            focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/20
                            hover:border-white/40
                        "
                            maxLength={10}
                            whileFocus={{ scale: 1.02 }}
                        />
                        <p className="mt-2 text-xs text-white/60 text-center">
                            Insira o código compartilhado pelo criador da sala
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="flex space-x-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.02, x: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('menu')}
                        className="
                        flex-1 rounded-xl border-2 border-white/30 bg-black/20 backdrop-blur-sm 
                        p-4 text-white font-semibold transition-all duration-300 
                        hover:bg-white/10 hover:border-white/50
                    "
                    >
                        Voltar
                    </motion.button>

                    <motion.button
                        whileHover={{
                            scale: 1.02,
                            x: 5,
                            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleJoinRoom}
                        disabled={joinRoomMutation.isPending || !roomCode.trim()}
                        className="
                        flex-1 bg-gradient-to-r from-green-600 to-emerald-600 
                        rounded-xl p-4 font-bold text-white transition-all duration-300 
                        hover:from-green-700 hover:to-emerald-700 shadow-2xl
                        disabled:cursor-not-allowed disabled:opacity-50
                        border-2 border-white/20 relative overflow-hidden
                    "
                    >
                        {joinRoomMutation.isPending ? (
                            <div className="flex items-center justify-center space-x-2">
                                <motion.div
                                    className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <span>Entrando...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <span>Entrar na Batalha</span>
                                <Zap size={20} />
                            </div>
                        )}
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default JoinRoom