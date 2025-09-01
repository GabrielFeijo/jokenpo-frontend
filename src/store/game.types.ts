import { Choice, GameResult, Match, Room, User } from '@/types/game';

export interface GameState {
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
