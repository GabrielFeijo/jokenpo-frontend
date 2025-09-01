import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { GameState } from './game.types';
import { User, Room, Match, Choice, GameResult } from '@/types/game';

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
