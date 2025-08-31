import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
	useUserStats,
	useGlobalStats,
	useDashboardData,
} from '../hooks/useApi';
import { useGameStore } from '../store/gameStore';
import { DashboardFilters, Choice, CHOICE_ICONS } from '../types/game';
import {
	BarChart3,
	Users,
	Trophy,
	Calendar,
	Filter,
	Gamepad2,
	Target,
	Zap,
	Crown,
	ArrowLeft,
	Star,
	Medal,
	Flame,
	Shield,
	Sparkles,
	Swords,
	ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const { currentUser } = useGameStore();
	const [filters, setFilters] = useState<DashboardFilters>({
		page: 1,
		limit: 10,
		userId: currentUser?.id,
	});
	const [showFilters, setShowFilters] = useState(false);

	const { data: userStats, isLoading: userStatsLoading } = useUserStats(
		currentUser?.id || ''
	);
	const { data: globalStats, isLoading: globalStatsLoading } = useGlobalStats();
	const { data: dashboardData, isLoading: dashboardLoading } =
		useDashboardData(filters);

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const getChoiceIcon = (choice: Choice) => (
		<motion.img
			src={CHOICE_ICONS[choice]}
			alt={choice}
			className="h-6 w-6"
			whileHover={{ scale: 1.2, rotate: 5 }}
			transition={{ duration: 0.2 }}
		/>
	);

	const StatCard: React.FC<{
		title: string;
		value: string | number;
		icon: React.ReactNode;
		color: string;
		gradient: string;
		delay?: number;
	}> = ({ title, value, icon, color, gradient, delay = 0 }) => (
		<motion.div
			initial={{ opacity: 0, y: 30, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ delay, duration: 0.6, type: "spring" }}
			whileHover={{
				scale: 1.03,
				y: -5,
				boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
			}}
			className={`
				relative rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-2xl 
				border border-white/20 backdrop-blur-sm overflow-hidden
			`}
		>
			<div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-xl`} />

			<div className="relative flex items-center justify-between">
				<div className="space-y-2">
					<p className="text-sm font-bold uppercase tracking-wide text-white/80">
						{title}
					</p>
					<motion.p
						className="text-3xl md:text-4xl font-black text-white"
						animate={{
							textShadow: [
								"0 0 10px rgba(255,255,255,0.3)",
								"0 0 20px rgba(255,255,255,0.5)",
								"0 0 10px rgba(255,255,255,0.3)"
							]
						}}
						transition={{ duration: 2, repeat: Infinity }}
					>
						{value}
					</motion.p>
				</div>
				<motion.div
					className="text-white/60"
					animate={{
						rotate: [0, 5, -5, 0],
						scale: [1, 1.1, 1]
					}}
					transition={{ duration: 2, repeat: Infinity }}
				>
					{icon}
				</motion.div>
			</div>
		</motion.div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-bg-from via-slate-800 to-bg-to relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(25)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-white/10 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -150, 0],
							opacity: [0, 0.8, 0],
							scale: [0, 1, 0],
						}}
						transition={{
							duration: 5 + Math.random() * 3,
							repeat: Infinity,
							delay: Math.random() * 3,
						}}
					/>
				))}

				<motion.div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						x: [0, 100, 0],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				<motion.div
					className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						x: [0, -100, 0],
						y: [0, 50, 0],
					}}
					transition={{
						duration: 15,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<motion.div
				className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<div className="container mx-auto px-6 py-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-6">
							<motion.button
								whileHover={{ scale: 1.1, x: -5 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => navigate('/')}
								className="
									w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
									flex items-center justify-center text-white shadow-lg
									hover:from-blue-700 hover:to-purple-700 transition-all duration-300
									border-2 border-white/20
								"
							>
								<ArrowLeft size={20} />
							</motion.button>

							<div>
								<motion.h1
									className="text-4xl md:text-5xl font-black text-white mb-2"
									animate={{
										textShadow: [
											"0 0 20px rgba(255,255,255,0.5)",
											"0 0 30px rgba(255,255,255,0.8)",
											"0 0 20px rgba(255,255,255,0.5)"
										]
									}}
									transition={{ duration: 3, repeat: Infinity }}
								>
									Arena Dashboard
								</motion.h1>
								<motion.p
									className="text-white/70 text-lg flex items-center space-x-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
								>
									<Sparkles size={16} />
									<span>Acompanhe suas conquistas épicas</span>
								</motion.p>
							</div>
						</div>

						<motion.button
							whileHover={{ scale: 1.05, rotateY: 5 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowFilters(!showFilters)}
							className="
								flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 
								rounded-xl px-6 py-3 text-white font-semibold transition-all duration-300 
								hover:from-purple-700 hover:to-pink-700 shadow-2xl
								border-2 border-white/20
							"
						>
							<Filter size={20} />
							<span>Filtros Avançados</span>
						</motion.button>
					</div>
				</div>
			</motion.div>

			<div className="relative z-10 container mx-auto space-y-12 px-6 py-12">
				<motion.div
					className="space-y-8"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.8 }}
				>
					<div className="flex items-center space-x-4">
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 10, -10, 0]
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<Crown size={32} className="text-yellow-400" />
						</motion.div>
						<h2 className="text-3xl font-bold text-white">Suas Conquistas</h2>
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<Sparkles size={24} className="text-yellow-300" />
						</motion.div>
					</div>

					{userStatsLoading ? (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							{[...Array(4)].map((_, i) => (
								<motion.div
									key={i}
									className="animate-pulse rounded-2xl bg-white/10 backdrop-blur-sm p-8 h-32 border border-white/10"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: i * 0.1 }}
								>
									<div className="mb-4 h-4 rounded bg-white/20"></div>
									<div className="h-8 rounded bg-white/20"></div>
								</motion.div>
							))}
						</div>
					) : (
						userStats && (
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
								<StatCard
									title="Total de Batalhas"
									value={userStats.userStats.totalMatches}
									icon={<Gamepad2 size={28} />}
									color="from-blue-500 to-blue-700"
									gradient="from-blue-600/80 to-blue-800/80"
									delay={0}
								/>
								<StatCard
									title="Vitórias Épicas"
									value={userStats.userStats.wins}
									icon={<Trophy size={28} />}
									color="from-green-500 to-green-700"
									gradient="from-green-600/80 to-green-800/80"
									delay={0.1}
								/>
								<StatCard
									title="Taxa de Domínio"
									value={`${(userStats.userStats.winRate * 100).toFixed(1)}%`}
									icon={<Target size={28} />}
									color="from-purple-500 to-purple-700"
									gradient="from-purple-600/80 to-purple-800/80"
									delay={0.2}
								/>
								<StatCard
									title="Arma Favorita"
									value={userStats.userStats.favoriteChoice}
									icon={getChoiceIcon(userStats.userStats.favoriteChoice)}
									color="from-orange-500 to-orange-700"
									gradient="from-orange-600/80 to-orange-800/80"
									delay={0.3}
								/>
							</div>
						)
					)}
				</motion.div>

				<motion.div
					className="space-y-8"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.8 }}
				>
					<div className="flex items-center space-x-4">
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 10, -10, 0]
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<Shield size={32} className="text-blue-400" />
						</motion.div>
						<h2 className="text-3xl font-bold text-white">Arena Global</h2>
						<motion.div
							animate={{
								opacity: [0.5, 1, 0.5],
								scale: [1, 1.1, 1]
							}}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							<Star size={24} className="text-blue-300" />
						</motion.div>
					</div>

					{globalStatsLoading ? (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{[...Array(3)].map((_, i) => (
								<motion.div
									key={i}
									className="animate-pulse rounded-2xl bg-white/10 backdrop-blur-sm p-8 h-32 border border-white/10"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: i * 0.1 }}
								>
									<div className="mb-4 h-4 rounded bg-white/20"></div>
									<div className="h-8 rounded bg-white/20"></div>
								</motion.div>
							))}
						</div>
					) : (
						globalStats && (
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
								<StatCard
									title="Batalhas Totais"
									value={globalStats.totalMatches.toLocaleString()}
									icon={<BarChart3 size={28} />}
									color="from-cyan-500 to-cyan-700"
									gradient="from-cyan-600/80 to-cyan-800/80"
									delay={0}
								/>
								<StatCard
									title="Guerreiros Ativos"
									value={globalStats.totalPlayers.toLocaleString()}
									icon={<Users size={28} />}
									color="from-emerald-500 to-emerald-700"
									gradient="from-emerald-600/80 to-emerald-800/80"
									delay={0.1}
								/>
								<StatCard
									title="Arma Dominante"
									value={globalStats.mostPopularChoice}
									icon={getChoiceIcon(globalStats.mostPopularChoice)}
									color="from-red-500 to-red-700"
									gradient="from-red-600/80 to-red-800/80"
									delay={0.2}
								/>
							</div>
						)
					)}
				</motion.div>

				<motion.div
					className="space-y-8"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9, duration: 0.8 }}
				>
					<div className="flex items-center space-x-4">
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 10, -10, 0]
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<Medal size={32} className="text-purple-400" />
						</motion.div>
						<h2 className="text-3xl font-bold text-white">Histórico de Batalhas</h2>
						<motion.div
							animate={{
								rotate: [0, 20, -20, 0],
								scale: [1, 1.2, 1]
							}}
							transition={{ duration: 3, repeat: Infinity }}
						>
							<Swords size={24} className="text-red-400" />
						</motion.div>
					</div>

					<div className="overflow-hidden rounded-3xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl">
						{dashboardLoading ? (
							<div className="p-8">
								<div className="space-y-4">
									{[...Array(5)].map((_, i) => (
										<motion.div
											key={i}
											className="flex animate-pulse items-center space-x-4 p-4 rounded-xl bg-white/5"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.1 }}
										>
											<div className="h-12 w-12 rounded-full bg-white/10"></div>
											<div className="flex-1 space-y-2">
												<div className="h-4 w-3/4 rounded bg-white/10"></div>
												<div className="h-3 w-1/2 rounded bg-white/10"></div>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						) : dashboardData?.matches.length ? (
							<div className="divide-y divide-white/5">
								{dashboardData.matches.map((match, index) => {

									console.log(match);
									const userPlay = match.plays?.find(
										(p) => p.playerId === currentUser?.id
									);
									const opponentPlay = match.plays?.find(
										(p) => p.playerId !== currentUser?.id
									);

									if (!match.results) return null;
									const isWin = match.results[0]?.winnerId === currentUser?.id;
									const isDraw = match.results[0]?.isDraw;

									return (
										<motion.div
											key={match.id}
											className="p-6 transition-all duration-300 hover:bg-white/5 group"
											initial={{ opacity: 0, x: -30 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1, duration: 0.6 }}
											whileHover={{ scale: 1.02 }}
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-4">
														<motion.div
															className="relative"
															whileHover={{ scale: 1.1, rotate: 5 }}
														>
															{userPlay && (
																<div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2 flex items-center justify-center shadow-lg">
																	{getChoiceIcon(userPlay.choice)}
																</div>
															)}
															{isWin && !isDraw && (
																<motion.div
																	className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
																>
																	<Crown size={12} className="text-yellow-900" />
																</motion.div>
															)}
														</motion.div>

														<motion.div
															className="text-white/60 font-bold text-lg px-3 py-1 rounded-full bg-white/10"
														>
															VS
														</motion.div>

														<motion.div
															className="relative"
															whileHover={{ scale: 1.1, rotate: -5 }}
														>
															{opponentPlay && (
																<div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-2 flex items-center justify-center shadow-lg">
																	{getChoiceIcon(opponentPlay.choice)}
																</div>
															)}
															{!isWin && !isDraw && (
																<motion.div
																	className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center shadow-lg"
																>
																	<Flame size={12} className="text-red-900" />
																</motion.div>
															)}
														</motion.div>
													</div>

													<div className="space-y-2">
														<div className="flex items-center space-x-3">
															<motion.span
																className={`
																	px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg
																	${isDraw
																		? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
																		: isWin
																			? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
																			: 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
																	}
																`}
																whileHover={{ scale: 1.05 }}
																animate={{
																	boxShadow: [
																		"0 0 0 rgba(0,0,0,0)",
																		`0 0 20px ${isDraw ? 'rgba(107,114,128,0.5)' : isWin ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)'}`,
																		"0 0 0 rgba(0,0,0,0)"
																	]
																}}
																transition={{ duration: 2, repeat: Infinity }}
															>
																{isDraw ? '🤝 Empate' : isWin ? '🏆 Vitória' : '💀 Derrota'}
															</motion.span>

															<span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
																{match.gameMode === 'CLASSIC' ? '🎯 Clássico' : '⚡ Estendido'}
															</span>
														</div>

														<div className="text-xs text-white/40 flex items-center space-x-2 bg-white/5 px-2 py-1 rounded-lg">
															<Calendar size={12} />
															<span>{formatDate(match.createdAt)}</span>
														</div>
													</div>
												</div>

												<motion.div
													className="text-right bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm"
													whileHover={{
														scale: 1.05,
														backgroundColor: "rgba(255,255,255,0.1)",
														borderColor: "rgba(255,255,255,0.2)"
													}}
												>
													<div className="text-xl font-bold text-white mb-1">
														{match.results[0]?.player1Score} - {match.results[0]?.player2Score}
													</div>
													<div className="text-xs text-white/50">Placar Final</div>
												</motion.div>
											</div>
										</motion.div>
									);
								})}
							</div>
						) : (
							<motion.div
								className="p-12 text-center text-white/60"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8 }}
							>
								<motion.div
									animate={{
										rotate: [0, 10, -10, 0],
										scale: [1, 1.1, 1]
									}}
									transition={{ duration: 3, repeat: Infinity }}
								>
									<Gamepad2 size={64} className="mx-auto mb-6 opacity-30" />
								</motion.div>
								<h3 className="text-2xl font-bold mb-4 text-white">Nenhuma Batalha Encontrada</h3>
								<p className="text-white/40 mb-8">
									Inicie sua jornada épica e conquiste a arena!
								</p>
								<motion.button
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => navigate('/')}
									className="
										bg-gradient-to-r from-blue-600 to-purple-600 
										px-8 py-4 rounded-xl font-semibold text-white
										transition-all duration-300 hover:from-blue-700 hover:to-purple-700
										shadow-2xl border-2 border-white/20
									"
								>
									<span className="flex items-center space-x-2">
										<Zap size={18} />
										<span>Começar a Jogar</span>
										<Sparkles size={18} />
									</span>
								</motion.button>
							</motion.div>
						)}

						{dashboardData?.hasMore && (
							<motion.div
								className="p-6 text-center border-t border-white/10 flex items-center justify-center gap-4"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
							>
								{filters.page > 1 &&
									<motion.button
										whileTap={{ scale: 0.95 }}
										onClick={() =>
											setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
										}
										className="
												bg-gradient-to-r from-red-600 to-pink-600 
												px-6 py-3 rounded-xl font-semibold text-white
												transition-all duration-300 hover:from-red-700 hover:to-pink-700
												shadow-2xl border-2 border-white/20 backdrop-blur-sm
												flex items-center space-x-2 min-w-[140px]
											"
									>
										<motion.div
											animate={{ x: [-2, 0, -2] }}
											transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
										>
											<ArrowLeft size={18} />
										</motion.div>
										<span>Anterior</span>
									</motion.button>
								}

								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={() =>
										setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
									}
									className="
												bg-gradient-to-r from-green-600 to-emerald-600 
												px-6 py-3 rounded-xl font-semibold text-white
												transition-all duration-300 hover:from-green-700 hover:to-emerald-700
												shadow-2xl border-2 border-white/20 backdrop-blur-sm
												flex items-center space-x-2 min-w-[140px]
											"
								>
									<span>Próxima</span>
									<motion.div
										animate={{ x: [0, 2, 0] }}
										transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
									>
										<ArrowRight size={18} />
									</motion.div>
								</motion.button>
							</motion.div>
						)}
					</div>
				</motion.div>
			</div>

			<AnimatePresence>
				{showFilters && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
						onClick={() => setShowFilters(false)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
							animate={{ scale: 1, opacity: 1, rotateY: 0 }}
							exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
							transition={{ duration: 0.5, type: "spring" }}
							onClick={(e) => e.stopPropagation()}
							className="w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-lg"
						>
							<div className="flex items-center justify-between mb-8">
								<h3 className="text-2xl font-bold text-white flex items-center space-x-3">
									<Filter className="text-purple-400" size={28} />
									<span>Filtros Avançados</span>
								</h3>
								<motion.button
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => setShowFilters(false)}
									className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
								>
									✕
								</motion.button>
							</div>

							<div className="space-y-6">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 }}
								>
									<label className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
										<Shield size={16} />
										<span>Modo de Batalha</span>
									</label>
									<select
										value={filters.gameMode || ''}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												gameMode: e.target.value as 'CLASSIC' | 'EXTENDED' | undefined,
												page: 1,
											}))
										}
										className="
											w-full rounded-xl border-2 border-white/20 bg-black/30 backdrop-blur-sm 
											p-4 text-white focus:border-purple-400 focus:outline-none 
											focus:ring-4 focus:ring-purple-400/20 transition-all duration-300
											hover:border-white/40
										"
									>
										<option value="" className="bg-slate-800">Todos os Modos</option>
										<option value="CLASSIC" className="bg-slate-800">🎯 Clássico</option>
										<option value="EXTENDED" className="bg-slate-800">⚡ Estendido</option>
									</select>
								</motion.div>

								<motion.div
									className="flex space-x-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
									<motion.button
										whileHover={{ scale: 1.02, x: -5 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowFilters(false)}
										className="
											flex-1 rounded-xl border-2 border-white/30 bg-black/20 backdrop-blur-sm 
											p-3 text-white font-semibold transition-all duration-300 
											hover:bg-white/10 hover:border-white/50
										"
									>
										Cancelar
									</motion.button>
									<motion.button
										whileHover={{
											scale: 1.02,
											x: 5,
											boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
										}}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowFilters(false)}
										className="
											flex-1 bg-gradient-to-r from-purple-600 to-pink-600 
											rounded-xl p-3 font-semibold text-white transition-all duration-300 
											hover:from-purple-700 hover:to-pink-700 shadow-2xl
											border-2 border-white/20
										"
									>
										<span className="flex items-center justify-center space-x-2">
											<Star size={16} />
											<span>Aplicar</span>
										</span>
									</motion.button>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dashboard;