import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';
import { useCreateGuestUser, useJoinRoom } from '@/hooks/useApi';

export const useGameRecovery = () => {
	const { roomCode } = useParams<{ roomCode: string }>();
	const { currentUser } = useGameStore();

	const [isRecovering, setIsRecovering] = useState(true);
	const [recoveryError, setRecoveryError] = useState<string | null>(null);

	const createGuestMutation = useCreateGuestUser();
	const joinRoomMutation = useJoinRoom();

	useEffect(() => {
		const recoverGameState = async () => {
			try {
				setIsRecovering(true);
				setRecoveryError(null);

				if (!roomCode) {
					setIsRecovering(false);
					return;
				}

				let user = currentUser;
				if (!user) {
					try {
						user = await createGuestMutation.mutateAsync();
					} catch (error) {
						console.error('Erro ao criar usuário:', error);
						setRecoveryError('Erro ao criar usuário');
						return;
					}
				}

				await joinRoomMutation.mutateAsync({
					roomId: roomCode,
					userId: user.id,
				});

				toast.success('Entrou na sala!');
			} catch (error) {
				console.error('Erro na recuperação do estado:', error);
				setRecoveryError('Erro ao recuperar estado do jogo');
			} finally {
				setIsRecovering(false);
			}
		};

		recoverGameState();
	}, [roomCode]);

	return {
		isRecovering,
		recoveryError,
		roomCode,
	};
};
