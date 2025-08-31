import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useGameRecovery } from '../hooks/useGameRecovery';
import { wsService } from '../services/websocket';
import { Choice } from '../types/game';
import { toast } from 'sonner';
import ChoiceButton from '@/components/choice-button';

const GameScreen: React.FC = () => {
	const navigate = useNavigate();
	const {
		currentUser,
		currentRoom,
		currentMatch,
		myChoice,
		opponentChoice,
		gameResult,
		isReady,
		opponentReady,
		gameMode,
		showRules,
		score,
		setMyChoice,
		setShowRules,
		playAgain,
		resetGame,
	} = useGameStore();

	const { isRecovering, recoveryError } = useGameRecovery();

	const [gamePhase, setGamePhase] = useState<
		'waiting' | 'choosing' | 'revealing' | 'result'
	>('waiting');

	const choices: Choice[] =
		gameMode === 'CLASSIC'
			? ['ROCK', 'PAPER', 'SCISSORS']
			: ['ROCK', 'PAPER', 'SCISSORS', 'LIZARD', 'SPOCK'];

	const canStartGame =
		currentRoom?.players.length === 2 && isReady && opponentReady;
	const isInRoom = !!currentRoom;
	const opponentPlayer = currentRoom?.players.find(
		(p) => p.id !== currentUser?.id
	);

	useEffect(() => {
		if (currentMatch?.status === 'PLAYING' && !myChoice) {
			setGamePhase('choosing');
		}

		if (currentMatch?.status === 'FINISHED' && gameResult) {
			setGamePhase('revealing');
		}
	}, [currentMatch, myChoice, gameResult, canStartGame]);

	const handleChoiceClick = (choice: Choice) => {
		if (!currentUser || !currentRoom || gamePhase !== 'choosing') return;

		setMyChoice(choice);
		wsService.makePlay(currentRoom.id, currentUser.id, choice);
	};

	const handleReadyClick = () => {
		if (!currentUser || !currentRoom) return;

		wsService.playerReady(currentRoom.id, currentUser.id);
		toast.success('Você está pronto!');
	};

	const handlePlayAgain = () => {
		if (!currentUser || !currentRoom) return;

		playAgain();
		wsService.requestRematch(currentRoom.id, currentUser.id);
		setGamePhase('choosing');
	};

	const handleLeaveGame = () => {
		if (currentUser && currentRoom) {
			wsService.leaveRoom(currentRoom.id, currentUser.id);
		}
		resetGame();
		navigate('/', { replace: true });
	};

	if (isRecovering) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-from to-bg-to">
				<div className="text-center text-white">
					<div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
					<p className="text-lg">Recuperando estado do jogo...</p>
				</div>
			</div>
		);
	}

	if (recoveryError) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-from to-bg-to">
				<div className="max-w-md text-center text-white">
					<p className="mb-4 text-lg">Erro ao recuperar jogo</p>
					<p className="mb-6 text-sm opacity-75">{recoveryError}</p>
					<button
						onClick={() => handleLeaveGame()}
						className="rounded-lg bg-white px-6 py-3 font-semibold text-dark-text transition-colors duration-200 hover:bg-gray-100"
					>
						Voltar ao Lobby
					</button>
				</div>
			</div>
		);
	}

	if (!currentRoom) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-from to-bg-to">
				<div className="text-center text-white">
					<p className="mb-4 text-lg">Sala não encontrada</p>
					<button
						onClick={() => handleLeaveGame()}
						className="rounded-lg bg-white px-6 py-3 font-semibold text-dark-text transition-colors duration-200 hover:bg-gray-100"
					>
						Voltar ao Lobby
					</button>
				</div>
			</div>
		);
	}

	const renderWaitingScreen = () => (
		<div className="space-y-8 text-center">
			<div className="text-xl font-semibold text-white md:text-2xl">
				{currentRoom?.players.length === 1 ? (
					<div className="space-y-4">
						<p>Aguardando outro jogador...</p>
						<div className="text-sm opacity-75">
							Compartilhe o código da sala:
							<span className="ml-2 font-bold text-yellow-300">
								{currentRoom.inviteCode}
							</span>
						</div>
						<div className="text-xs opacity-60">
							Ou compartilhe o link: {window.location.href}
						</div>
					</div>
				) : (
					<div className="space-y-6">
						<p>Sala completa!</p>
						<div className="flex flex-col items-center space-y-4">
							<div className="text-sm opacity-75">
								Jogadores:{' '}
								{currentRoom?.players
									.map((p) => p.name || 'Jogador')
									.join(' vs ')}
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleReadyClick}
								disabled={isReady}
								className={`rounded-lg px-8 py-3 font-semibold text-dark-text ${
									isReady
										? 'cursor-not-allowed bg-green-400'
										: 'bg-white hover:bg-gray-100'
								} transition-colors duration-200`}
							>
								{isReady ? '✓ Pronto!' : 'Estou Pronto'}
							</motion.button>

							{isReady && !opponentReady && (
								<div className="animate-pulse text-sm text-yellow-300">
									Aguardando o outro jogador...
								</div>
							)}

							{isReady && opponentReady && (
								<div className="animate-bounce text-sm text-green-300">
									Iniciando jogo...
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);

	const renderChoiceScreen = () => (
		<div className="space-y-8">
			<div className="text-center text-lg font-semibold text-white">
				Faça sua escolha
			</div>

			<div
				className={`grid justify-items-center gap-8 ${
					gameMode === 'CLASSIC'
						? 'grid-cols-2 md:grid-cols-3'
						: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
				} `}
			>
				{choices.map((choice) => (
					<ChoiceButton
						key={choice}
						choice={choice}
						onClick={() => handleChoiceClick(choice)}
						disabled={!!myChoice}
					/>
				))}
			</div>

			{myChoice && (
				<div className="text-center text-white">
					<div className="mb-2 text-sm opacity-75">Você escolheu:</div>
					<div className="text-lg font-semibold capitalize">{myChoice}</div>
					<div className="mt-2 animate-pulse text-sm text-yellow-300">
						Aguardando o oponente...
					</div>
				</div>
			)}
		</div>
	);

	const renderRevealScreen = () => (
		<div className="space-y-8">
			<div className="grid grid-cols-2 gap-8 md:gap-16">
				<div className="space-y-4 text-center">
					<div className="text-sm font-semibold uppercase tracking-wider text-white md:text-base">
						You Picked
					</div>
					<div className="flex justify-center">
						{myChoice && (
							<ChoiceButton
								choice={myChoice}
								onClick={() => {}}
								disabled={true}
								size="large"
							/>
						)}
					</div>
				</div>

				<div className="space-y-4 text-center">
					<div className="text-sm font-semibold uppercase tracking-wider text-white md:text-base">
						The House Picked
					</div>
					<div className="flex justify-center">
						{opponentChoice ? (
							<ChoiceButton
								choice={opponentChoice}
								onClick={() => {}}
								disabled={true}
								size="large"
							/>
						) : (
							<div className="h-32 w-32 animate-pulse rounded-full bg-gray-700 md:h-40 md:w-40" />
						)}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{gameResult && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="space-y-4 text-center"
					>
						<div className="text-4xl font-bold uppercase text-white md:text-5xl">
							{gameResult === 'WIN' && 'You Win'}
							{gameResult === 'LOSE' && 'You Lose'}
							{gameResult === 'DRAW' && 'Draw'}
						</div>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handlePlayAgain}
							className="rounded-lg bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-dark-text transition-colors duration-200 hover:bg-gray-100"
						>
							Play Again
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-bg-from to-bg-to">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between rounded-lg border-2 border-header-outline p-4 md:p-6">
					<div className="text-white">
						<h1 className="text-2xl font-bold uppercase tracking-wider md:text-3xl">
							Rock
							<br />
							Paper
							<br />
							Scissors
						</h1>
					</div>

					<div className="min-w-[100px] rounded-lg bg-white p-4 text-center md:p-6">
						<div className="text-xs font-semibold uppercase tracking-wider text-score-text md:text-sm">
							Score
						</div>
						<div className="text-3xl font-bold text-dark-text md:text-4xl">
							{score}
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 pb-8">
				<div className="mx-auto max-w-2xl">
					<AnimatePresence mode="wait">
						{gamePhase === 'waiting' && (
							<motion.div
								key="waiting"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{renderWaitingScreen()}
							</motion.div>
						)}

						{gamePhase === 'choosing' && (
							<motion.div
								key="choosing"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
							>
								{renderChoiceScreen()}
							</motion.div>
						)}

						{(gamePhase === 'revealing' || gamePhase === 'result') && (
							<motion.div
								key="result"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
							>
								{renderRevealScreen()}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Botões de ação */}
			<div className="fixed bottom-8 left-4 right-4 flex justify-between">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLeaveGame}
					className="rounded-lg border-2 border-red-500 bg-red-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-red-600"
				>
					Sair
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setShowRules(true)}
					className="rounded-lg border-2 border-header-outline px-6 py-3 font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-dark-text"
				>
					Rules
				</motion.button>
			</div>

			<AnimatePresence>
				{showRules && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
						onClick={() => setShowRules(false)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
							className="w-full max-w-md rounded-lg bg-white p-8"
						>
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold uppercase text-dark-text">
									Rules
								</h2>
								<button
									onClick={() => setShowRules(false)}
									className="text-gray-400 hover:text-gray-600"
								>
									✕
								</button>
							</div>

							<div className="space-y-4 text-dark-text">
								<img
									src={
										gameMode === 'CLASSIC'
											? '/image-rules.svg'
											: '/image-rules-bonus.svg'
									}
									alt="Game rules"
									className="w-full"
								/>

								<div className="text-sm">
									<h3 className="mb-2 font-bold">Como jogar:</h3>
									<ul className="space-y-1 text-xs">
										{gameMode === 'CLASSIC' ? (
											<>
												<li>• Paper beats Rock</li>
												<li>• Rock beats Scissors</li>
												<li>• Scissors beats Paper</li>
											</>
										) : (
											<>
												<li>• Rock beats Scissors & Lizard</li>
												<li>• Paper beats Rock & Spock</li>
												<li>• Scissors beats Paper & Lizard</li>
												<li>• Lizard beats Spock & Paper</li>
												<li>• Spock beats Scissors & Rock</li>
											</>
										)}
									</ul>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{isInRoom && (
				<div className="fixed left-4 top-4 rounded-lg bg-black bg-opacity-30 p-3 text-sm text-white">
					<div>Sala: {currentRoom?.inviteCode}</div>
					<div>Jogadores: {currentRoom?.players.length}/2</div>
					{opponentPlayer && <div>Vs: {opponentPlayer.name || 'Jogador'}</div>}
					<div className="mt-1 text-xs opacity-75">
						Modo: {gameMode === 'CLASSIC' ? 'Clássico' : 'Estendido'}
					</div>
				</div>
			)}
		</div>
	);
};

export default GameScreen;
