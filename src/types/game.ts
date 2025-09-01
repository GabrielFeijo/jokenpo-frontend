export type Choice = 'ROCK' | 'PAPER' | 'SCISSORS' | 'LIZARD' | 'SPOCK';

export type GameResult = 'WIN' | 'LOSE' | 'DRAW';

export interface User {
	id: string;
	name?: string;
	isGuest: boolean;
	socketId?: string;
}

export interface Room {
	id: string;
	createdBy: string;
	createdAt: Date;
	gameMode: 'CLASSIC' | 'EXTENDED';
	status: 'WAITING' | 'READY' | 'PLAYING' | 'FINISHED';
	players: User[];
	currentMatch?: Match;
	inviteCode: string;
}

export interface Match {
	id: string;
	roomId: string;
	gameMode: 'CLASSIC' | 'EXTENDED';
	status: 'WAITING' | 'PLAYING' | 'FINISHED';
	plays: Play[];
	results?: MatchResult[];
	createdAt: Date;
}

export interface Play {
	id: string;
	matchId: string;
	playerId: string;
	choice: Choice;
	timestamp: Date;
}

export interface MatchResult {
	id: string;
	matchId: string;
	winnerId?: string;
	loserPlayerId?: string;
	isDraw: boolean;
	player1Score: number;
	player2Score: number;
	createdAt: Date;
}

export interface GameStats {
	totalMatches: number;
	wins: number;
	losses: number;
	draws: number;
	winRate: number;
	favoriteChoice: Choice;
}

export interface SocketEvents {
	'join-room': { roomId: string; userId: string };
	'leave-room': { roomId: string; userId: string };
	'player-ready': { roomId: string; userId: string };
	'make-play': { roomId: string; userId: string; choice: Choice };
	rematch: { roomId: string; userId: string };

	'room-joined': { room: Room };
	'room-updated': { room: Room };
	'player-joined': { user: User };
	'player-left': { userId: string };
	'game-started': { match: Match };
	'play-made': { play: Play };
	'round-result': { result: MatchResult; plays: Play[] };
	'match-finished': { match: Match; finalResult: MatchResult };
	error: { message: string; code: string };
}

export interface CreateRoomRequest {
	gameMode: 'CLASSIC' | 'EXTENDED';
	userId: string;
}

export interface CreateRoomResponse {
	room: Room;
	socketUrl: string;
}

export interface JoinRoomRequest {
	roomId: string;
	userId: string;
}

export interface GetStatsResponse {
	userStats: GameStats;
	globalStats: {
		totalMatches: number;
		totalPlayers: number;
		mostPopularChoice: Choice;
	};
}

export interface DashboardFilters {
	userId?: string;
	startDate?: Date;
	endDate?: Date;
	gameMode?: 'CLASSIC' | 'EXTENDED';
	page: number;
	limit: number;
}

export const GAME_RULES: Record<Choice, Choice[]> = {
	ROCK: ['SCISSORS', 'LIZARD'],
	PAPER: ['ROCK', 'SPOCK'],
	SCISSORS: ['PAPER', 'LIZARD'],
	LIZARD: ['SPOCK', 'PAPER'],
	SPOCK: ['SCISSORS', 'ROCK'],
};

export const CHOICE_COLORS: Record<Choice, string> = {
	ROCK: 'rock-gradient',
	PAPER: 'paper-gradient',
	SCISSORS: 'scissors-gradient',
	LIZARD: 'lizard-gradient',
	SPOCK: 'spock-gradient',
};

export const CHOICE_ICONS: Record<Choice, string> = {
	ROCK: '/icon-rock.svg',
	PAPER: '/icon-paper.svg',
	SCISSORS: '/icon-scissors.svg',
	LIZARD: '/icon-lizard.svg',
	SPOCK: '/icon-spock.svg',
};
