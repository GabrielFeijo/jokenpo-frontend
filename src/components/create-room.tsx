import { useCreateRoom, useUpdateUser } from '@/hooks/useApi';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion'
import { Crown, Users, Shield, Sword, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateRoom = ({ playerName, setPlayerName, gameMode, setGameMode, setMode }:
    { playerName: string, setPlayerName: React.Dispatch<React.SetStateAction<string>>, gameMode: 'CLASSIC' | 'EXTENDED', setGameMode: React.Dispatch<React.SetStateAction<"CLASSIC" | "EXTENDED">>, setMode: React.Dispatch<React.SetStateAction<"menu" | "create" | "join">> }
) => {

    const createRoomMutation = useCreateRoom();
    const { currentUser, setUser, setGameMode: setStoreGameMode } = useGameStore();
    const navigate = useNavigate();
    const updateUserMutation = useUpdateUser();

    const handleCreateRoom = async () => {
        if (!currentUser) {
            toast.error('Erro: usuário não encontrado');
            return;
        }

        if (playerName.trim()) {
            setUser({ ...currentUser, name: playerName.trim() });
            updateUserMutation.mutateAsync({ id: currentUser.id, name: playerName.trim() });
        }

        setStoreGameMode(gameMode);

        try {
            const response = await createRoomMutation.mutateAsync({
                gameMode,
                userId: currentUser.id,
            });

            navigate(`/game/${response.room.inviteCode}`, { replace: true });
        } catch (error) {
            console.error('Erro ao criar sala:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
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
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                    >
                        <Crown size={64} className="mx-auto text-yellow-400 mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Criar Nova Arena</h2>
                    <p className="text-white/70">Configure sua batalha épica</p>
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
								focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20
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
                            <span>Modo de Batalha</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setGameMode('CLASSIC')}
                                className={`
									rounded-xl p-4 font-semibold transition-all duration-300 relative overflow-hidden
									${gameMode === 'CLASSIC'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/30'
                                        : 'bg-black/20 border-2 border-white/20 text-white hover:bg-white/10'
                                    }
								`}
                            >
                                {gameMode === 'CLASSIC' && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                                )}
                                <div className="relative flex flex-col items-center space-y-2">
                                    <Sword size={20} />
                                    <span>Clássico</span>
                                    <span className="text-xs opacity-75">3 opções</span>
                                </div>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setGameMode('EXTENDED')}
                                className={`
									rounded-xl p-4 font-semibold transition-all duration-300 relative overflow-hidden
									${gameMode === 'EXTENDED'
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/30'
                                        : 'bg-black/20 border-2 border-white/20 text-white hover:bg-white/10'
                                    }
								`}
                            >
                                {gameMode === 'EXTENDED' && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                                )}
                                <div className="relative flex flex-col items-center space-y-2">
                                    <Zap size={20} />
                                    <span>Estendido</span>
                                    <span className="text-xs opacity-75">5 opções</span>
                                </div>
                            </motion.button>
                        </div>

                        <motion.p
                            className="my-3 text-xs text-white/60 text-center bg-white/5 p-3 rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {gameMode === 'CLASSIC'
                                ? '🎯 Modo tradicional: Pedra, Papel, Tesoura'
                                : '⚡ Modo avançado: + Lagarto e Spock'}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    className="flex space-x-4"
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
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreateRoom}
                        disabled={createRoomMutation.isPending}
                        className="
							flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 
							rounded-xl p-4 font-bold text-white transition-all duration-300 
							hover:from-yellow-600 hover:to-orange-700 shadow-2xl
							disabled:cursor-not-allowed disabled:opacity-50
							border-2 border-white/20 relative overflow-hidden
						"
                    >
                        {createRoomMutation.isPending ? (
                            <div className="flex items-center justify-center space-x-2">
                                <motion.div
                                    className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <span>Criando...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <span>Criar Arena</span>
                                <Crown size={20} />
                            </div>
                        )}
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default CreateRoom