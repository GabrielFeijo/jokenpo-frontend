import { useGameRecovery } from '@/hooks/useGameRecovery';
import { motion } from 'framer-motion';

const GameRecoveryError = ({
	handleLeaveGame,
}: {
	handleLeaveGame: () => void;
}) => {
	const { recoveryError } = useGameRecovery();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-from via-slate-800 to-bg-to">
			<motion.div
				className="max-w-md rounded-2xl border border-white/10 bg-black/20 p-8 text-center text-white backdrop-blur-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="mb-4 text-6xl">🚫</div>
				<p className="mb-4 text-xl font-semibold">
					{recoveryError ? 'Erro ao recuperar jogo' : 'Sala não encontrada'}
				</p>
				{recoveryError && (
					<p className="mb-6 rounded-lg bg-red-500/20 p-3 text-sm opacity-75">
						{recoveryError}
					</p>
				)}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLeaveGame}
					className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
				>
					Voltar ao Lobby
				</motion.button>
			</motion.div>
		</div>
	);
};

export default GameRecoveryError;
