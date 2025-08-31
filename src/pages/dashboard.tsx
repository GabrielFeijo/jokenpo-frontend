import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	useUserStats,
	useGlobalStats,
	useDashboardData,
} from '../hooks/useApi';
import { useGameStore } from '../store/gameStore';
import { DashboardFilters, Choice, CHOICE_ICONS } from '../types/game';
import {
	BarChart3,
	TrendingUp,
	Users,
	Trophy,
	Calendar,
	Filter,
	Gamepad2,
} from 'lucide-react';

const Dashboard: React.FC = () => {
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
		<img src={CHOICE_ICONS[choice]} alt={choice} className="h-6 w-6" />
	);

	const StatCard: React.FC<{
		title: string;
		value: string | number;
		icon: React.ReactNode;
		color: string;
	}> = ({ title, value, icon, color }) => (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className={`rounded-lg border-l-4 bg-white p-6 shadow-lg ${color} `}
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm uppercase tracking-wide text-gray-600">
						{title}
					</p>
					<p className="text-2xl font-bold text-dark-text">{value}</p>
				</div>
				<div className="text-gray-400">{icon}</div>
			</div>
		</motion.div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-bg-from to-bg-to">
			<div className="bg-black bg-opacity-20 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold text-white md:text-3xl">
							Dashboard
						</h1>
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center space-x-2 rounded-lg border-2 border-header-outline px-4 py-2 text-white transition-colors duration-200 hover:bg-white hover:text-dark-text"
						>
							<Filter size={18} />
							<span>Filtros</span>
						</button>
					</div>
				</div>
			</div>

			<div className="container mx-auto space-y-8 px-4 py-8">
				<div className="space-y-4">
					<h2 className="flex items-center space-x-2 text-xl font-bold text-white">
						<Trophy size={24} />
						<span>Suas Estatísticas</span>
					</h2>

					{userStatsLoading ? (
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
							{[...Array(4)].map((_, i) => (
								<div key={i} className="animate-pulse rounded-lg bg-white p-6">
									<div className="mb-2 h-4 rounded bg-gray-200"></div>
									<div className="h-8 rounded bg-gray-200"></div>
								</div>
							))}
						</div>
					) : (
						userStats && (
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
								<StatCard
									title="Total de Partidas"
									value={userStats.userStats.totalMatches}
									icon={<Gamepad2 size={24} />}
									color="border-blue-500"
								/>
								<StatCard
									title="Vitórias"
									value={userStats.userStats.wins}
									icon={<Trophy size={24} />}
									color="border-green-500"
								/>
								<StatCard
									title="Taxa de Vitória"
									value={`${(userStats.userStats.winRate * 100).toFixed(1)}%`}
									icon={<TrendingUp size={24} />}
									color="border-purple-500"
								/>
								<StatCard
									title="Escolha Favorita"
									value={userStats.userStats.favoriteChoice}
									icon={getChoiceIcon(userStats.userStats.favoriteChoice)}
									color="border-orange-500"
								/>
							</div>
						)
					)}
				</div>

				<div className="space-y-4">
					<h2 className="flex items-center space-x-2 text-xl font-bold text-white">
						<Users size={24} />
						<span>Estatísticas Globais</span>
					</h2>

					{globalStatsLoading ? (
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="animate-pulse rounded-lg bg-white p-6">
									<div className="mb-2 h-4 rounded bg-gray-200"></div>
									<div className="h-8 rounded bg-gray-200"></div>
								</div>
							))}
						</div>
					) : (
						globalStats && (
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<StatCard
									title="Total de Partidas"
									value={globalStats.totalMatches}
									icon={<BarChart3 size={24} />}
									color="border-blue-500"
								/>
								<StatCard
									title="Jogadores Ativos"
									value={globalStats.totalPlayers}
									icon={<Users size={24} />}
									color="border-green-500"
								/>
								<StatCard
									title="Escolha Mais Popular"
									value={globalStats.mostPopularChoice}
									icon={getChoiceIcon(globalStats.mostPopularChoice)}
									color="border-red-500"
								/>
							</div>
						)
					)}
				</div>

				<div className="space-y-4">
					<h2 className="flex items-center space-x-2 text-xl font-bold text-white">
						<Calendar size={24} />
						<span>Histórico de Partidas</span>
					</h2>

					<div className="overflow-hidden rounded-lg bg-white shadow-lg">
						{dashboardLoading ? (
							<div className="p-6">
								<div className="space-y-3">
									{[...Array(5)].map((_, i) => (
										<div
											key={i}
											className="flex animate-pulse items-center space-x-4"
										>
											<div className="h-8 w-8 rounded-full bg-gray-200"></div>
											<div className="flex-1 space-y-2">
												<div className="h-4 w-3/4 rounded bg-gray-200"></div>
												<div className="h-3 w-1/2 rounded bg-gray-200"></div>
											</div>
										</div>
									))}
								</div>
							</div>
						) : dashboardData?.matches.length ? (
							<div className="divide-y divide-gray-100">
								{dashboardData.matches.map((match) => {
									const userPlay = match.plays?.find(
										(p) => p.playerId === currentUser?.id
									);
									const opponentPlay = match.plays?.find(
										(p) => p.playerId !== currentUser?.id
									);
									const isWin = match.result?.winnerId === currentUser?.id;
									const isDraw = match.result?.isDraw;

									return (
										<div
											key={match.id}
											className="p-4 transition-colors hover:bg-gray-50"
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4">
													<div className="flex items-center space-x-2">
														{userPlay && getChoiceIcon(userPlay.choice)}
														<span className="text-gray-400">vs</span>
														{opponentPlay && getChoiceIcon(opponentPlay.choice)}
													</div>

													<div>
														<div className="flex items-center space-x-2">
															<span
																className={`rounded px-2 py-1 text-xs font-medium ${
																	isDraw
																		? 'bg-gray-100 text-gray-700'
																		: isWin
																			? 'bg-green-100 text-green-700'
																			: 'bg-red-100 text-red-700'
																} `}
															>
																{isDraw
																	? 'Empate'
																	: isWin
																		? 'Vitória'
																		: 'Derrota'}
															</span>
															<span className="text-sm text-gray-500">
																{match.gameMode === 'CLASSIC'
																	? 'Clássico'
																	: 'Estendido'}
															</span>
														</div>
														<div className="mt-1 text-xs text-gray-400">
															{formatDate(match.createdAt)}
														</div>
													</div>
												</div>

												<div className="text-right">
													<div className="text-sm font-medium text-dark-text">
														{match.result?.player1Score} -{' '}
														{match.result?.player2Score}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="p-8 text-center text-gray-500">
								<Gamepad2 size={48} className="mx-auto mb-4 opacity-50" />
								<p>Nenhuma partida encontrada</p>
								<p className="text-sm">
									Jogue algumas partidas para ver seu histórico aqui!
								</p>
							</div>
						)}
					</div>

					{dashboardData?.hasMore && (
						<div className="text-center">
							<button
								onClick={() =>
									setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
								}
								className="rounded-lg bg-white px-6 py-2 font-semibold text-dark-text transition-colors duration-200 hover:bg-gray-100"
							>
								Carregar Mais
							</button>
						</div>
					)}
				</div>
			</div>

			{showFilters && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="w-full max-w-md rounded-lg bg-white p-6"
					>
						<div className="mb-6 flex items-center justify-between">
							<h3 className="text-xl font-bold text-dark-text">Filtros</h3>
							<button
								onClick={() => setShowFilters(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								✕
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Modo de Jogo
								</label>
								<select
									value={filters.gameMode || ''}
									onChange={(e) =>
										setFilters((prev) => ({
											...prev,
											gameMode: e.target.value as
												| 'CLASSIC'
												| 'EXTENDED'
												| undefined,
											page: 1,
										}))
									}
									className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
								>
									<option value="">Todos</option>
									<option value="classic">Clássico</option>
									<option value="extended">Estendido</option>
								</select>
							</div>

							<div className="flex space-x-3">
								<button
									onClick={() => setShowFilters(false)}
									className="flex-1 rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
								>
									Cancelar
								</button>
								<button
									onClick={() => {
										setShowFilters(false);
									}}
									className="flex-1 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
								>
									Aplicar
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
