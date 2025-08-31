import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '../store/gameStore';
import {
	CreateRoomRequest,
	DashboardFilters,
	JoinRoomRequest,
	User,
} from '../types/game';
import { apiService } from '../services/api';
import { toast } from 'sonner';
import { wsService } from '../services/websocket';

export const useCreateGuestUser = () => {
	const setUser = useGameStore((state) => state.setUser);

	return useMutation({
		mutationFn: apiService.createGuestUser,
		onSuccess: (user) => {
			setUser(user);
		},
		onError: (error) => {
			console.error('Failed to create guest user:', error);
			toast.error('Erro ao criar usuário. Tente novamente.');
		},
	});
};

export const useUpdateUser = () => {
	const setUser = useGameStore((state) => state.setUser);

	return useMutation({
		mutationFn: (data: Partial<User>) => {
			const { id, ...rest } = data;
			return apiService.updateUser(id!, rest);
		},
		onSuccess: (user) => {
			setUser(user);
		},
		onError: (error) => {
			console.error('Failed to update user:', error);
			toast.error('Erro ao atualizar usuário. Tente novamente.');
		},
	});
};

export const useCreateRoom = () => {
	const queryClient = useQueryClient();
	const setRoom = useGameStore((state) => state.setRoom);

	return useMutation({
		mutationFn: (data: CreateRoomRequest) => apiService.createRoom(data),
		onSuccess: async (response) => {
			setRoom(response.room);
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
		onError: (error) => {
			console.error('Failed to create room:', error);
			toast.error('Erro ao criar sala. Tente novamente.');
		},
	});
};

export const useJoinRoom = () => {
	const queryClient = useQueryClient();
	const setRoom = useGameStore((state) => state.setRoom);

	return useMutation({
		mutationFn: (data: JoinRoomRequest) => apiService.joinRoom(data),
		onSuccess: async (response, { userId }) => {
			setRoom(response.room);
			try {
				await wsService.connect(response.socketUrl);

				wsService.joinRoom(response.room.id, userId);
			} catch (error) {
				console.error('Failed to connect to WebSocket:', error);
				toast.error('Erro ao conectar com o servidor');
			}

			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
		onError: (error) => {
			console.error('Failed to join room:', error);
			toast.error('Erro ao entrar na sala. Verifique o código.');
		},
	});
};

export const useUserStats = (userId: string) => {
	return useQuery({
		queryKey: ['stats', 'user', userId],
		queryFn: () => apiService.getUserStats(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5,
	});
};

export const useGlobalStats = () => {
	return useQuery({
		queryKey: ['stats', 'global'],
		queryFn: () => apiService.getGlobalStats(),
		staleTime: 1000 * 60 * 5,
	});
};

export const useMatchHistory = (userId: string, page = 1, limit = 10) => {
	return useQuery({
		queryKey: ['matches', 'history', userId, page, limit],
		queryFn: () => apiService.getMatchHistory(userId, page, limit),
		enabled: !!userId,
		keepPreviousData: true,
	});
};

export const useDashboardData = (filters: DashboardFilters) => {
	return useQuery({
		queryKey: ['dashboard', filters],
		queryFn: () => apiService.getDashboardData(filters),
		keepPreviousData: true,
	});
};
