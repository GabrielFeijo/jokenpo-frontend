import { useGameStore } from '@/store/gameStore';
import { User } from '@/types/game';
import { motion } from 'framer-motion';
import { Users, Swords } from 'lucide-react';

const RoomStatus = ({
	opponentPlayer,
	handleLeaveGame,
}: {
	opponentPlayer?: User;
	handleLeaveGame: () => void;
}) => {
	const { currentRoom, gameMode, setShowRules } = useGameStore();

	return (
		<motion.div
			className="fixed bottom-4 left-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-white shadow-2xl backdrop-blur-md"
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 1, duration: 0.6 }}
		>
			<div className="space-y-2 text-sm">
				<div className="flex items-center space-x-2">
					<div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
					<span className="font-semibold">Sala: {currentRoom?.inviteCode}</span>
				</div>
				<div className="flex items-center space-x-2">
					<Users size={14} />
					<span>Jogadores: {currentRoom?.players.length}/2</span>
				</div>
				{opponentPlayer && (
					<div className="flex items-center space-x-2">
						<Swords size={14} />
						<span>Vs: {opponentPlayer.name || 'Adversário'}</span>
					</div>
				)}
				<div className="rounded bg-white/10 px-2 py-1 text-xs opacity-75">
					{gameMode === 'CLASSIC' ? '🎯 Clássico' : '⚡ Estendido'}
				</div>

				<motion.button
					whileHover={{ scale: 1.05, rotateX: 5 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setShowRules(true)}
					className="block rounded border-2 border-white/20 bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-1 font-bold uppercase tracking-wider text-white shadow-2xl transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
				>
					Regras
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05, rotateX: 5 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLeaveGame}
					className="block rounded border-2 border-white/20 bg-gradient-to-r from-red-600 to-pink-600 px-11 py-1 font-bold text-white shadow-2xl transition-all duration-300 hover:from-red-700 hover:to-pink-700"
				>
					SAIR
				</motion.button>
			</div>
		</motion.div>
	);
};

export default RoomStatus;
