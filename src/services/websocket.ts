import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';
import {
	Room,
	Match,
	Play,
	MatchResult,
	User,
	GameResult,
	Choice,
} from '../types/game';
import { toast } from 'sonner';

class WebSocketService {
	private socket: Socket | null = null;
	private store = useGameStore.getState();

	connect(socketUrl: string, token?: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.socket = io(socketUrl, {
					auth: token ? { token } : undefined,
					transports: ['websocket'],
					autoConnect: true,
				});

				this.socket.on('connect', () => {
					this.store.setConnectionStatus(true);
					this.setupEventListeners();
					resolve();
				});

				this.socket.on('connect_error', (error) => {
					console.error('❌ WebSocket connection error:', error);
					this.store.setConnectionStatus(false, error.message);
					reject(error);
				});

				this.socket.on('disconnect', () => {
					this.store.setConnectionStatus(false);
				});
			} catch (error) {
				console.error('❌ Failed to initialize WebSocket:', error);
				reject(error);
			}
		});
	}

	private setupEventListeners() {
		if (!this.socket) return;

		this.socket.on('room-joined', (data: { room: Room }) => {
			this.store.setRoom(data.room);
		});

		this.socket.on('room-updated', (data: { room: Room }) => {
			this.store.setRoom(data.room);
		});

		this.socket.on('player-joined', (data: { user: User }) => {
			toast.success(`${data.user.name || 'Jogador'} entrou na sala!`);
		});

		this.socket.on('player-left', () => {
			toast.error('Jogador saiu da sala');
			this.store.setReady(false);
			this.store.setOpponentReady(false);
		});

		this.socket.on('game-started', (data: { match: Match }) => {
			this.store.setMatch(data.match);
			this.store.playAgain();
			toast.success('Jogo iniciado! Faça sua escolha!');
		});

		this.socket.on('play-made', (data: { play: Play }) => {
			const { currentUser } = useGameStore.getState();
			if (currentUser && data.play.playerId !== currentUser.id) {
				this.store.setOpponentChoice(data.play.choice);
			}
		});

		this.socket.on(
			'match-finished',
			(data: { match: Match; result: MatchResult; plays: Play[] }) => {
				this.store.setMatch(data.match);
				this.handleRoundResult(data.result);
			}
		);

		this.socket.on('connect_error', (err) => {
			console.error('❌ Erro de conexão:', err.message);
		});

		this.socket.on('connect_failed', (err) => {
			console.error('❌ Falha na conexão:', err);
		});

		this.socket.on('disconnect', (reason) => {
			console.warn('⚠️ Socket desconectado:', reason);
		});

		this.socket.on('error', (err) => {
			console.error('❌ Socket error (baixo nível):', err);
		});

		this.socket.on('game-error', (data: { message: string; code: string }) => {
			console.error('❌ Socket error:', data);

			switch (data.code) {
				case 'ROOM_FULL':
					toast.error('Esta sala já está cheia! Máximo 2 jogadores.');
					break;
				case 'ROOM_NOT_FOUND':
					toast.error('Sala não encontrada!');
					break;
				case 'ALREADY_IN_ROOM':
					toast.error('Você já está nesta sala!');
					break;
				case 'GAME_IN_PROGRESS':
					toast.error('Jogo já está em andamento!');
					break;
				default:
					toast.error(data.message || 'Erro no servidor');
			}
		});
	}

	private handleRoundResult(result: MatchResult) {
		const { currentUser } = useGameStore.getState();
		if (!currentUser) return;

		let gameResult: GameResult;
		if (result.isDraw) {
			gameResult = 'DRAW';
		} else if (result.winnerId === currentUser.id) {
			gameResult = 'WIN';
			this.store.updateScore(1);
		} else {
			gameResult = 'LOSE';
			this.store.updateScore(-1);
		}

		this.store.setGameResult(gameResult);

		this.store.setAnimating(true);

		setTimeout(() => {
			this.store.setAnimating(false);
		}, 2000);

		const messages = {
			WIN: '🎉 Você ganhou!',
			LOSE: '😔 Você perdeu!',
			DRAW: '🤝 Empate!',
		};

		setTimeout(() => {
			toast.success(messages[gameResult]);
		}, 1500);
	}

	joinRoom(roomId: string, userId: string) {
		this.socket?.emit('join-room', { roomId, userId });
	}

	leaveRoom(roomId: string, userId: string) {
		this.socket?.emit('leave-room', { roomId, userId });
	}

	playerReady(roomId: string, userId: string) {
		this.socket?.emit('player-ready', { roomId, userId });
		this.store.setReady(true);
	}

	makePlay(roomId: string, userId: string, choice: Choice) {
		this.socket?.emit('make-play', { roomId, userId, choice });
		this.store.setMyChoice(choice);
	}

	requestRematch(roomId: string, userId: string) {
		this.socket?.emit('rematch', { roomId, userId });
		this.store.playAgain();
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
			this.store.setConnectionStatus(false);
		}
	}

	isConnected(): boolean {
		return this.socket?.connected || false;
	}
}

export const wsService = new WebSocketService();
