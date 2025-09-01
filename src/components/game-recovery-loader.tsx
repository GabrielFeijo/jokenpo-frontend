import { motion } from 'framer-motion';

const GameRecoveryLoader = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-from via-slate-800 to-bg-to">
			<motion.div
				className="text-center text-white"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
			>
				<motion.div
					className="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-white border-t-transparent"
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
				/>
				<motion.p
					className="text-xl font-semibold"
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				>
					Recuperando estado do jogo...
				</motion.p>
			</motion.div>
		</div>
	);
};

export default GameRecoveryLoader;
