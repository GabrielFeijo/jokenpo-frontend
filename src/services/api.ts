import axios from 'axios';
import {
	CreateRoomRequest,
	CreateRoomResponse,
	JoinRoomRequest,
	GetStatsResponse,
	DashboardFilters,
	Match,
	User,
	Room,
} from '../types/game';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';

const api = axios.create({
	baseURL: `${API_BASE_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const apiService = {
	createGuestUser: async (): Promise<User> => {
		const response = await api.post('/users/guest');
		return response.data;
	},

	updateUser: async (id: string, data: Partial<User>): Promise<User> => {
		const response = await api.patch(`/users/${id}`, data);
		return response.data;
	},

	createRoom: async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
		const response = await api.post('/rooms', data);
		return response.data;
	},

	joinRoom: async (data: JoinRoomRequest): Promise<CreateRoomResponse> => {
		const response = await api.post('/rooms/join', data);
		return response.data;
	},

	getRoomById: async (roomId: string): Promise<Room> => {
		const response = await api.get(`/rooms/${roomId}`);
		return response.data;
	},

	getRoomByInviteCode: async (inviteCode: string): Promise<Room> => {
		const response = await api.get(`/rooms/invite/${inviteCode}`);
		return response.data;
	},

	getUserStats: async (userId: string): Promise<GetStatsResponse> => {
		const response = await api.get(`/stats/user/${userId}`);
		return response.data;
	},

	getGlobalStats: async (): Promise<GetStatsResponse['globalStats']> => {
		const response = await api.get('/stats/global');
		return response.data;
	},

	getDashboardData: async (
		filters: DashboardFilters
	): Promise<{
		matches: Match[];
		total: number;
		hasMore: boolean;
		page: number;
	}> => {
		const response = await api.get('/stats/dashboard', { params: filters });
		return response.data;
	},

	getMatchHistory: async (
		userId: string,
		page = 1,
		limit = 10
	): Promise<{
		matches: Match[];
		total: number;
		hasMore: boolean;
	}> => {
		const response = await api.get(`/matches/history/${userId}`, {
			params: { page, limit },
		});
		return response.data;
	},
};
