import { useGameStore } from './gameStore';

export const useUser = () => useGameStore((state) => state.currentUser);
export const useRoom = () => useGameStore((state) => state.currentRoom);
export const useMatch = () => useGameStore((state) => state.currentMatch);

export const useGameState = () =>
	useGameStore((state) => ({
		myChoice: state.myChoice,
		opponentChoice: state.opponentChoice,
		gameResult: state.gameResult,
		isPlaying: state.isPlaying,
		score: state.score,
	}));

export const useReadyState = () =>
	useGameStore((state) => ({
		isReady: state.isReady,
		opponentReady: state.opponentReady,
		canStartGame:
			state.isReady &&
			state.opponentReady &&
			state.currentRoom?.players.length === 2,
	}));

export const useConnection = () =>
	useGameStore((state) => ({
		isConnected: state.isConnected,
		connectionError: state.connectionError,
	}));

export const useUI = () =>
	useGameStore((state) => ({
		gameMode: state.gameMode,
		showRules: state.showRules,
		isAnimating: state.isAnimating,
	}));
