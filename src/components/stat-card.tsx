import { motion } from 'framer-motion';

const StatCard = ({
	title,
	value,
	icon,
	color,
	gradient,
	delay = 0,
}: {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	color: string;
	gradient: string;
	delay?: number;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ delay, duration: 0.6, type: 'spring' }}
			whileHover={{
				scale: 1.03,
				y: -5,
				boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
			}}
			className={`relative rounded-2xl bg-gradient-to-br ${gradient} overflow-hidden border border-white/20 p-6 shadow-2xl backdrop-blur-sm`}
		>
			<div
				className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-xl`}
			/>

			<div className="relative flex items-center justify-between">
				<div className="space-y-2">
					<p className="text-sm font-bold uppercase tracking-wide text-white/80">
						{title}
					</p>
					<motion.p
						className="text-3xl font-black text-white md:text-4xl"
						animate={{
							textShadow: [
								'0 0 10px rgba(255,255,255,0.3)',
								'0 0 20px rgba(255,255,255,0.5)',
								'0 0 10px rgba(255,255,255,0.3)',
							],
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
						scale: [1, 1.1, 1],
					}}
					transition={{ duration: 2, repeat: Infinity }}
				>
					{icon}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default StatCard;
