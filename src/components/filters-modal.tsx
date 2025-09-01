import { DashboardFilters } from "@/types/game"
import { AnimatePresence, motion } from "framer-motion"
import { Filter, Shield, Star } from "lucide-react"

const FiltersModal = ({ showFilters, setShowFilters, filters, setFilters }: { showFilters: boolean, setShowFilters: React.Dispatch<React.SetStateAction<boolean>>, filters: DashboardFilters, setFilters: React.Dispatch<React.SetStateAction<DashboardFilters>> }) => {

    return (
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
    )
}

export default FiltersModal