import { DashboardFilters } from '@/types/game';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Shield, Star } from 'lucide-react';

const FiltersModal = ({
	showFilters,
	setShowFilters,
	filters,
	setFilters,
}: {
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	filters: DashboardFilters;
	setFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>;
}) => {
	return (
		<AnimatePresence>
			{showFilters && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
					onClick={() => setShowFilters(false)}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
						animate={{ scale: 1, opacity: 1, rotateY: 0 }}
						exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
						transition={{ duration: 0.5, type: 'spring' }}
						onClick={(e) => e.stopPropagation()}
						className="w-full max-w-lg rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl backdrop-blur-lg"
					>
						<div className="mb-8 flex items-center justify-between">
							<h3 className="flex items-center space-x-3 text-2xl font-bold text-white">
								<Filter className="text-purple-400" size={28} />
								<span>Filtros Avançados</span>
							</h3>
							<motion.button
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => setShowFilters(false)}
								className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-colors hover:bg-red-600"
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
								<label className="mb-3 flex items-center space-x-2 text-sm font-semibold text-white">
									<Shield size={16} />
									<span>Modo de Batalha</span>
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
									className="w-full rounded-xl border-2 border-white/20 bg-black/30 p-4 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20"
								>
									<option value="" className="bg-slate-800">
										Todos os Modos
									</option>
									<option value="CLASSIC" className="bg-slate-800">
										🎯 Clássico
									</option>
									<option value="EXTENDED" className="bg-slate-800">
										⚡ Estendido
									</option>
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
									className="flex-1 rounded-xl border-2 border-white/30 bg-black/20 p-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
								>
									Cancelar
								</motion.button>
								<motion.button
									whileHover={{
										scale: 1.02,
										x: 5,
										boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
									}}
									whileTap={{ scale: 0.98 }}
									onClick={() => setShowFilters(false)}
									className="flex-1 rounded-xl border-2 border-white/20 bg-gradient-to-r from-purple-600 to-pink-600 p-3 font-semibold text-white shadow-2xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
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
	);
};

export default FiltersModal;
