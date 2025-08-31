import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { Choice, User, Room, Match, GameResult } from '../types/game';

interface GameState {
	currentUser: User | null;
	currentRoom: Room | null;
	isConnected: boolean;
	connectionError: string | null;
	currentMatch: Match | null;
	myChoice: Choice | null;
	opponentChoice: Choice | null;
	gameResult: GameResult | null;
	isPlaying: boolean;
	isReady: boolean;
	opponentReady: boolean;
	score: number;
	gameMode: 'CLASSIC' | 'EXTENDED';
	showRules: boolean;
	isAnimating: boolean;

	setUser: (user: User) => void;
	setRoom: (room: Room | null) => void;
	setConnectionStatus: (connected: boolean, error?: string) => void;
	setMatch: (match: Match | null) => void;
	setMyChoice: (choice: Choice | null) => void;
	setOpponentChoice: (choice: Choice | null) => void;
	setGameResult: (result: GameResult | null) => void;
	setReady: (ready: boolean) => void;
	setOpponentReady: (ready: boolean) => void;
	updateScore: (points: number) => void;
	setGameMode: (mode: 'CLASSIC' | 'EXTENDED') => void;
	setShowRules: (show: boolean) => void;
	setAnimating: (animating: boolean) => void;
	resetGame: () => void;
	playAgain: () => void;
}

export const useGameStore = create<GameState>()(
	persist(
		subscribeWithSelector((set, get) => ({
			currentUser: null,
			currentRoom: null,
			isConnected: false,
			connectionError: null,
			currentMatch: null,
			myChoice: null,
			opponentChoice: null,
			gameResult: null,
			isPlaying: false,
			isReady: false,
			opponentReady: false,
			score: 0,
			gameMode: 'CLASSIC',
			showRules: false,
			isAnimating: false,

			setUser: (user: User) => set({ currentUser: user }),
			setRoom: (room: Room | null) => set({ currentRoom: room }),
			setConnectionStatus: (connected: boolean, error?: string) =>
				set({ isConnected: connected, connectionError: error }),
			setMatch: (match: Match | null) =>
				set({ currentMatch: match, isPlaying: !!match }),
			setMyChoice: (choice: Choice | null) => set({ myChoice: choice }),
			setOpponentChoice: (choice: Choice | null) =>
				set({ opponentChoice: choice }),
			setGameResult: (result: GameResult | null) => set({ gameResult: result }),
			setReady: (ready: boolean) => set({ isReady: ready }),
			setOpponentReady: (ready: boolean) => set({ opponentReady: ready }),
			updateScore: (points: number) => {
				const newScore = get().score + points;
				set({ score: newScore });
			},
			setGameMode: (mode: 'CLASSIC' | 'EXTENDED') => set({ gameMode: mode }),
			setShowRules: (show: boolean) => set({ showRules: show }),
			setAnimating: (animating: boolean) => set({ isAnimating: animating }),

			resetGame: () =>
				set({
					currentRoom: null,
					currentMatch: null,
					myChoice: null,
					opponentChoice: null,
					gameResult: null,
					isPlaying: false,
					isReady: false,
					opponentReady: false,
					isConnected: false,
					connectionError: null,
					score: 0,
				}),

			playAgain: () =>
				set({
					myChoice: null,
					opponentChoice: null,
					gameResult: null,
					isAnimating: false,
				}),
		})),
		{
			name: 'rps-game-state',
			partialize: (state) => ({
				currentUser: state.currentUser,
				currentRoom: state.currentRoom,
				currentMatch: state.currentMatch,
				myChoice: state.myChoice,
				opponentChoice: state.opponentChoice,
				gameResult: state.gameResult,
				score: state.score,
				gameMode: state.gameMode,
				isReady: state.isReady,
				opponentReady: state.opponentReady,
			}),
		}
	)
);

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
