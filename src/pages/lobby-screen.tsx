import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import {
	useCreateRoom,
	useJoinRoom,
	useCreateGuestUser,
} from '../hooks/useApi';
import { Users, Plus, LogIn, Gamepad2 } from 'lucide-react';
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
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="space-y-8"
		>
			<div className="space-y-4 text-center">
				<h1 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
					Rock
					<br />
					Paper
					<br />
					Scissors
				</h1>
				<p className="text-lg text-white opacity-75">
					Desafie um amigo para uma partida épica!
				</p>
			</div>

			<div className="mx-auto max-w-md space-y-4">
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setMode('create')}
					className="flex w-full items-center justify-center space-x-3 rounded-lg bg-white p-4 font-semibold text-dark-text transition-colors duration-200 hover:bg-gray-100"
				>
					<Plus size={20} />
					<span>Criar Nova Sala</span>
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setMode('join')}
					className="flex w-full items-center justify-center space-x-3 rounded-lg border-2 border-white p-4 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-dark-text"
				>
					<LogIn size={20} />
					<span>Entrar em Sala</span>
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => navigate('/dashboard')}
					className="flex w-full items-center justify-center space-x-3 rounded-lg border-2 border-header-outline p-4 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-dark-text"
				>
					<Gamepad2 size={20} />
					<span>Dashboard</span>
				</motion.button>
			</div>
		</motion.div>
	);

	const renderCreateRoom = () => (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			className="mx-auto max-w-md space-y-6"
		>
			<div className="text-center">
				<h2 className="mb-2 text-2xl font-bold text-white">Criar Nova Sala</h2>
				<p className="text-white opacity-75">Configure sua partida</p>
			</div>

			<div className="space-y-4">
				<div>
					<label className="mb-2 block text-sm font-medium text-white">
						Seu nome (opcional)
					</label>
					<input
						type="text"
						value={playerName}
						onChange={(e) => setPlayerName(e.target.value)}
						placeholder="Digite seu nome"
						className="w-full rounded-lg border-2 border-header-outline bg-transparent p-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
						maxLength={20}
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-white">
						Modo de Jogo
					</label>
					<div className="grid grid-cols-2 gap-2">
						<button
							onClick={() => setGameMode('CLASSIC')}
							className={`rounded-lg p-3 font-medium transition-colors duration-200 ${
								gameMode === 'CLASSIC'
									? 'bg-white text-dark-text'
									: 'border-2 border-header-outline text-white hover:bg-white hover:text-dark-text'
							} `}
						>
							Clássico
						</button>
						<button
							onClick={() => setGameMode('EXTENDED')}
							className={`rounded-lg p-3 font-medium transition-colors duration-200 ${
								gameMode === 'EXTENDED'
									? 'bg-white text-dark-text'
									: 'border-2 border-header-outline text-white hover:bg-white hover:text-dark-text'
							} `}
						>
							Estendido
						</button>
					</div>
					<p className="mt-1 text-xs text-white opacity-60">
						{gameMode === 'CLASSIC'
							? 'Pedra, Papel, Tesoura'
							: 'Pedra, Papel, Tesoura, Lagarto, Spock'}
					</p>
				</div>
			</div>

			<div className="flex space-x-3">
				<button
					onClick={() => setMode('menu')}
					className="flex-1 rounded-lg border-2 border-header-outline p-3 text-white transition-colors duration-200 hover:bg-white hover:text-dark-text"
				>
					Voltar
				</button>

				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={handleCreateRoom}
					disabled={createRoomMutation.isPending}
					className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-white p-3 font-semibold text-dark-text transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{createRoomMutation.isPending ? (
						<div className="h-5 w-5 animate-spin rounded-full border-2 border-dark-text border-t-transparent" />
					) : (
						<>
							<Gamepad2 size={18} />
							<span>Criar</span>
						</>
					)}
				</motion.button>
			</div>
		</motion.div>
	);

	const renderJoinRoom = () => (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			className="mx-auto max-w-md space-y-6"
		>
			<div className="text-center">
				<h2 className="mb-2 text-2xl font-bold text-white">Entrar em Sala</h2>
				<p className="text-white opacity-75">Digite o código da sala</p>
			</div>

			<div className="space-y-4">
				<div>
					<label className="mb-2 block text-sm font-medium text-white">
						Seu nome (opcional)
					</label>
					<input
						type="text"
						value={playerName}
						onChange={(e) => setPlayerName(e.target.value)}
						placeholder="Digite seu nome"
						className="w-full rounded-lg border-2 border-header-outline bg-transparent p-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
						maxLength={20}
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-white">
						Código da Sala
					</label>
					<input
						type="text"
						value={roomCode}
						onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
						placeholder="EX: ABC123"
						className="w-full rounded-lg border-2 border-header-outline bg-transparent p-3 text-center text-lg font-bold uppercase tracking-wider text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
						maxLength={10}
					/>
				</div>
			</div>

			<div className="flex space-x-3">
				<button
					onClick={() => setMode('menu')}
					className="flex-1 rounded-lg border-2 border-header-outline p-3 text-white transition-colors duration-200 hover:bg-white hover:text-dark-text"
				>
					Voltar
				</button>

				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={handleJoinRoom}
					disabled={joinRoomMutation.isPending || !roomCode.trim()}
					className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-white p-3 font-semibold text-dark-text transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{joinRoomMutation.isPending ? (
						<div className="h-5 w-5 animate-spin rounded-full border-2 border-dark-text border-t-transparent" />
					) : (
						<>
							<Users size={18} />
							<span>Entrar</span>
						</>
					)}
				</motion.button>
			</div>
		</motion.div>
	);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-from to-bg-to p-4">
			<div className="w-full max-w-4xl">
				{mode === 'menu' && renderMainMenu()}
				{mode === 'create' && renderCreateRoom()}
				{mode === 'join' && renderJoinRoom()}
			</div>
		</div>
	);
};

export default LobbyScreen;
