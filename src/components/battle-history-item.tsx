import { useGameStore } from '@/store/gameStore';
import { Match } from '@/types/game';
import { getChoiceIcon } from '@/utils/get-choice-icon';
import { motion } from 'framer-motion';
import { Crown, Flame, Calendar } from 'lucide-react';

const BattleHistoryItem = ({
	match,
	index,
}: {
	match: Match;
	index: number;
}) => {
	const { currentUser } = useGameStore();

	const userPlay = match.plays?.find((p) => p.playerId === currentUser?.id);
	const opponentPlay = match.plays?.find((p) => p.playerId !== currentUser?.id);

	if (!match.results) return null;
	const isWin = match.results[0]?.winnerId === currentUser?.id;
	const isDraw = match.results[0]?.isDraw;

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<motion.div
			key={match.id}
			className="group p-6 transition-all duration-300 hover:bg-white/5"
			initial={{
				opacity: 0,
				x: -30,
			}}
			animate={{
				opacity: 1,
				x: 0,
			}}
			transition={{
				delay: index * 0.1,
				duration: 0.6,
			}}
			whileHover={{
				scale: 1.02,
			}}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-6">
					<div className="flex items-center space-x-4">
						<motion.div
							className="relative"
							whileHover={{
								scale: 1.1,
								rotate: 5,
							}}
						>
							{userPlay && (
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2 shadow-lg">
									{getChoiceIcon(userPlay.choice)}
								</div>
							)}
							{isWin && !isDraw && (
								<motion.div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 shadow-lg">
									<Crown size={12} className="text-yellow-900" />
								</motion.div>
							)}
						</motion.div>

						<motion.div className="rounded-full bg-white/10 px-3 py-1 text-lg font-bold text-white/60">
							VS
						</motion.div>

						<motion.div
							className="relative"
							whileHover={{
								scale: 1.1,
								rotate: -5,
							}}
						>
							{opponentPlay && (
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-2 shadow-lg">
									{getChoiceIcon(opponentPlay.choice)}
								</div>
							)}
							{!isWin && !isDraw && (
								<motion.div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-400 shadow-lg">
									<Flame size={12} className="text-red-900" />
								</motion.div>
							)}
						</motion.div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center space-x-3">
							<motion.span
								className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg ${
									isDraw
										? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
										: isWin
											? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
											: 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
								} `}
								whileHover={{
									scale: 1.05,
								}}
								animate={{
									boxShadow: [
										'0 0 0 rgba(0,0,0,0)',
										`0 0 20px ${isDraw ? 'rgba(107,114,128,0.5)' : isWin ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)'}`,
										'0 0 0 rgba(0,0,0,0)',
									],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
								}}
							>
								{isDraw ? '🤝 Empate' : isWin ? '🏆 Vitória' : '💀 Derrota'}
							</motion.span>

							<span className="rounded-lg bg-white/10 px-3 py-1 text-sm text-white/60 backdrop-blur-sm">
								{match.gameMode === 'CLASSIC' ? '🎯 Clássico' : '⚡ Estendido'}
							</span>
						</div>

						<div className="flex w-fit items-center space-x-2 rounded-lg bg-white/5 px-2 py-1 text-xs text-white/40">
							<Calendar size={12} />
							<span>{formatDate(match.createdAt)}</span>
						</div>
					</div>
				</div>

				<motion.div
					className="rounded-xl border border-white/10 bg-white/5 p-4 text-right backdrop-blur-sm"
					whileHover={{
						scale: 1.05,
						backgroundColor: 'rgba(255,255,255,0.1)',
						borderColor: 'rgba(255,255,255,0.2)',
					}}
				>
					<div className="mb-1 text-xl font-bold text-white">
						{match.results[0]?.player1Score} - {match.results[0]?.player2Score}
					</div>
					<div className="text-xs text-white/50">Placar Final</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default BattleHistoryItem;
