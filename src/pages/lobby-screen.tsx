import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import {
	useCreateRoom,
	useJoinRoom,
	useCreateGuestUser,
	useUpdateUser,
} from '../hooks/useApi';
import {
	Users,
	Plus,
	LogIn,
	Gamepad2,
	Sparkles,
	Zap,
	Crown,
	Sword,
	Shield,
	Star
} from 'lucide-react';
import { toast } from 'sonner';

const LobbyScreen: React.FC = () => {
	const navigate = useNavigate();
	const [mode, setMode] = useState<'menu' | 'create' | 'join'>('menu');
	const [roomCode, setRoomCode] = useState('');
	const [gameMode, setGameMode] = useState<'CLASSIC' | 'EXTENDED'>('CLASSIC');
	const [playerName, setPlayerName] = useState('');

	const {
		currentUser,
		setUser,
		setGameMode: setStoreGameMode,
	} = useGameStore();

	const createGuestMutation = useCreateGuestUser();
	const updateUserMutation = useUpdateUser();
	const createRoomMutation = useCreateRoom();
	const joinRoomMutation = useJoinRoom();

	useEffect(() => {
		if (!currentUser && !createGuestMutation.isPending) {
			createGuestMutation.mutate();
		}
	}, [currentUser, createGuestMutation.isPending]);

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

	const renderMainMenu = () => (
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
					Entre na arena épica e desafie amigos em batalhas estratégicas!
					<br />
					<span className="text-yellow-400 font-semibold">Que a sorte esteja com você! ⚡</span>
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
						<Plus size={24} />
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
						<LogIn size={24} />
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
						<Gamepad2 size={24} />
						<span className="text-lg">Estatísticas</span>
						<Star size={24} />
					</div>
				</motion.button>
			</motion.div>
		</motion.div>
	);

	const renderCreateRoom = () => (
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
							flex-2 bg-gradient-to-r from-yellow-500 to-orange-600 
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
								<Sparkles size={20} />
								<span>Criar Arena</span>
								<Crown size={20} />
							</div>
						)}
					</motion.button>
				</motion.div>
			</motion.div>
		</motion.div>
	);

	const renderJoinRoom = () => (
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
							flex-2 bg-gradient-to-r from-green-600 to-emerald-600 
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
								<Zap size={20} />
								<span>Entrar na Batalha</span>
								<Sparkles size={20} />
							</div>
						)}
					</motion.button>
				</motion.div>
			</motion.div>
		</motion.div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-bg-from via-slate-800 to-bg-to relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(30)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-white/20 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -200, 0],
							opacity: [0, 1, 0],
							scale: [0, 1, 0],
						}}
						transition={{
							duration: 4 + Math.random() * 3,
							repeat: Infinity,
							delay: Math.random() * 3,
							ease: "easeInOut",
						}}
					/>
				))}

				<motion.div
					className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						x: [0, 100, 0],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				<motion.div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						x: [0, -100, 0],
						y: [0, 50, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className="relative z-10 flex min-h-screen items-center justify-center p-6">
				<div className="w-full max-w-6xl">
					<AnimatePresence mode="wait">
						{mode === 'menu' && (
							<motion.div
								key="menu"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{renderMainMenu()}
							</motion.div>
						)}
						{mode === 'create' && (
							<motion.div
								key="create"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{renderCreateRoom()}
							</motion.div>
						)}
						{mode === 'join' && (
							<motion.div
								key="join"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{renderJoinRoom()}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<div className="absolute top-10 right-10 pointer-events-none">
				<motion.div
					animate={{
						rotate: [0, 360],
						scale: [1, 1.1, 1],
					}}
					transition={{
						rotate: { duration: 20, repeat: Infinity, ease: "linear" },
						scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
					}}
					className="text-6xl opacity-20"
				>
					⚡
				</motion.div>
			</div>

			<div className="absolute bottom-10 left-10 pointer-events-none">
				<motion.div
					animate={{
						rotate: [0, -360],
						scale: [1, 1.2, 1],
					}}
					transition={{
						rotate: { duration: 25, repeat: Infinity, ease: "linear" },
						scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
					}}
					className="text-5xl opacity-20"
				>
					🏆
				</motion.div>
			</div>
		</div>
	);
};

export default LobbyScreen;