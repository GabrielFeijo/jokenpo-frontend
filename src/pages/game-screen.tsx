import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useGameRecovery } from '../hooks/useGameRecovery';
import { wsService } from '../services/websocket';
import { Choice } from '../types/game';
import { toast } from 'sonner';
import GameRecoveryLoader from '@/components/game-recovery-loader';
import GameRecoveryError from '@/components/game-recovery-error';
import WaitingRoomScreen from '@/components/waiting-room-screen';
import ChoiceScreen from '@/components/choice-screen';
import RevealScreen from '@/components/reveal-screen';
import RulesModal from '@/components/rules-modal';
import GameHeader from '@/components/game-header';
import RoomStatus from '@/components/room-status';

const GameScreen: React.FC = () => {
	const navigate = useNavigate();
	const {
		currentUser,
		currentRoom,
		currentMatch,
		myChoice,
		gameResult,
		isReady,
		opponentReady,
		gameMode,
		setMyChoice,
		playAgain,
		resetGame,
	} = useGameStore();

	const { isRecovering, recoveryError } = useGameRecovery();
	const [countdown, setCountdown] = useState<number | null>(null);
	const [showChoices, setShowChoices] = useState(false);

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
		if (canStartGame && gamePhase === 'waiting') {
			setCountdown(3);
			const timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev === 1) {
						clearInterval(timer);
						setGamePhase('choosing');
						setShowChoices(true);
						return null;
					}
					return prev ? prev - 1 : null;
				});
			}, 1000);
		}
	}, [canStartGame, gamePhase]);

	useEffect(() => {
		if (currentMatch?.status === 'PLAYING' && !myChoice) {
			setGamePhase('choosing');
			setShowChoices(true);
		}

		if (currentMatch?.status === 'FINISHED' && gameResult) {
			setGamePhase('revealing');
			setShowChoices(false);
		}
	}, [currentMatch, myChoice, gameResult]);

	const handleChoiceClick = (choice: Choice) => {
		if (!currentUser || !currentRoom || gamePhase !== 'choosing') return;

		setMyChoice(choice);
		wsService.makePlay(currentRoom.id, currentUser.id, choice);
		setShowChoices(false);
	};

	const handleReadyClick = () => {
		if (!currentUser || !currentRoom) return;

		wsService.playerReady(currentRoom.id, currentUser.id);
		toast.success('Você está pronto para o duelo!');
	};

	const handlePlayAgain = () => {
		if (!currentUser || !currentRoom) return;

		playAgain();
		wsService.requestRematch(currentRoom.id, currentUser.id);
		setGamePhase('choosing');
		setShowChoices(true);
	};

	const handleLeaveGame = () => {
		if (currentUser && currentRoom) {
			wsService.leaveRoom(currentRoom.id, currentUser.id);
			wsService.disconnect();
		}
		resetGame();
		navigate('/', { replace: true });
	};

	if (isRecovering) {
		return <GameRecoveryLoader />;
	}

	if (recoveryError || !currentRoom) {
		return <GameRecoveryError handleLeaveGame={handleLeaveGame} />;
	}

	const renderWaitingScreen = () => (
		<WaitingRoomScreen
			countdown={countdown || 0}
			opponentPlayer={opponentPlayer}
			handleReadyClick={handleReadyClick}
		/>
	);

	const renderChoiceScreen = () => (
		<ChoiceScreen
			choices={choices}
			showChoices={showChoices}
			handleChoiceClick={handleChoiceClick}
		/>
	);

	const renderRevealScreen = () => (
		<RevealScreen handlePlayAgain={handlePlayAgain} />
	);

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-bg-from via-slate-800 to-bg-to">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute h-2 w-2 rounded-full bg-white/10"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -100, 0],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>

			<GameHeader />

			<div className="container mx-auto px-4 pb-8">
				<div className="mx-auto max-w-4xl">
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

			{isInRoom && (
				<RoomStatus
					opponentPlayer={opponentPlayer}
					handleLeaveGame={handleLeaveGame}
				/>
			)}

			<RulesModal />
		</div>
	);
};

export default GameScreen;
