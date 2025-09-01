import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useCreateGuestUser } from '../hooks/useApi';
import LobbyMenu from '@/components/lobby-meny';
import CreateRoom from '@/components/create-room';
import JoinRoom from '@/components/join-room';

const LobbyScreen: React.FC = () => {
	const [mode, setMode] = useState<'menu' | 'create' | 'join'>('menu');
	const [roomCode, setRoomCode] = useState('');
	const [gameMode, setGameMode] = useState<'CLASSIC' | 'EXTENDED'>('CLASSIC');
	const [playerName, setPlayerName] = useState('');

	const { currentUser } = useGameStore();

	const createGuestMutation = useCreateGuestUser();

	useEffect(() => {
		if (!currentUser && !createGuestMutation.isPending) {
			createGuestMutation.mutate();
		}
	}, [currentUser, createGuestMutation.isPending]);

	const renderMainMenu = () => <LobbyMenu setMode={setMode} />;

	const renderCreateRoom = () => (
		<CreateRoom
			setMode={setMode}
			playerName={playerName}
			setPlayerName={setPlayerName}
			gameMode={gameMode}
			setGameMode={setGameMode}
		/>
	);

	const renderJoinRoom = () => (
		<JoinRoom
			setMode={setMode}
			playerName={playerName}
			setPlayerName={setPlayerName}
			roomCode={roomCode}
			setRoomCode={setRoomCode}
		/>
	);

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-bg-from via-slate-800 to-bg-to">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{[...Array(30)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute h-1 w-1 rounded-full bg-white/20"
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
							ease: 'easeInOut',
						}}
					/>
				))}

				<motion.div
					className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						x: [0, 100, 0],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>

				<motion.div
					className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						x: [0, -100, 0],
						y: [0, 50, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: 'easeInOut',
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

			<div className="pointer-events-none absolute right-10 top-10">
				<motion.div
					animate={{
						rotate: [0, 360],
						scale: [1, 1.1, 1],
					}}
					transition={{
						rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
						scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
					}}
					className="text-6xl opacity-20"
				>
					⚡
				</motion.div>
			</div>

			<div className="pointer-events-none absolute bottom-10 left-10">
				<motion.div
					animate={{
						rotate: [0, -360],
						scale: [1, 1.2, 1],
					}}
					transition={{
						rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
						scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
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
