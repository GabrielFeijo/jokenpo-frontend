import { Choice, CHOICE_ICONS } from '@/types/game';
import { motion } from 'framer-motion';

interface ChoiceButtonProps {
	choice: Choice;
	onClick: () => void;
	disabled?: boolean;
	size?: 'normal' | 'large';
	isSelected?: boolean;
	showResult?: boolean;
	isWinner?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
	choice,
	onClick,
	disabled = false,
	size = 'normal',
	isSelected = false,
	showResult = false,
	isWinner = false,
}) => {
	const getGradientClass = (choice: Choice) => {
		const gradients = {
			ROCK: 'bg-gradient-to-br from-rock-from via-red-400 to-rock-to shadow-red-500/30',
			PAPER: 'bg-gradient-to-br from-paper-from via-blue-400 to-paper-to shadow-blue-500/30',
			SCISSORS: 'bg-gradient-to-br from-scissors-from via-yellow-400 to-scissors-to shadow-yellow-500/30',
			LIZARD: 'bg-gradient-to-br from-lizard-from via-purple-400 to-lizard-to shadow-purple-500/30',
			SPOCK: 'bg-gradient-to-br from-spock-from via-cyan-400 to-spock-to shadow-cyan-500/30',
		};
		return gradients[choice];
	};

	const sizeClasses =
		size === 'large'
			? 'w-36 h-36 md:w-44 md:h-44'
			: 'w-28 h-28 md:w-32 md:h-32';

	const innerSize = size === 'large' ? 'h-20 w-20 md:h-24 md:w-24' : 'h-16 w-16 md:h-18 md:w-18';
	const iconSize = size === 'large' ? 'h-10 w-10 md:h-12 md:w-12' : 'h-8 w-8 md:h-10 md:w-10';

	return (
		<motion.div
			className="relative"
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.3, type: "spring" }}
		>
			{showResult && isWinner && (
				<motion.div
					className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-60 blur-xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.6, 0.8, 0.6],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			)}

			{isSelected && !showResult && (
				<motion.div
					className="absolute inset-0 rounded-full bg-white opacity-20"
					animate={{
						scale: [1, 1.3, 1],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			)}

			<motion.button
				whileHover={!disabled ? {
					scale: 1.05,
					rotateY: 5,
				} : {}}
				whileTap={!disabled ? {
					scale: 0.95,
					rotateX: 10,
				} : {}}
				onClick={onClick}
				disabled={disabled}
				className={`
					${sizeClasses} 
					${getGradientClass(choice)} 
					relative flex items-center justify-center rounded-full 
					shadow-2xl transition-all duration-300 transform-gpu
					${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-3xl'}
					${isSelected ? 'ring-4 ring-white ring-opacity-50' : ''}
					${showResult && isWinner ? 'ring-4 ring-yellow-400 ring-opacity-70' : ''}
					border-4 border-white/20
				`}
				style={{
					transformStyle: 'preserve-3d',
				}}
			>
				<div className="absolute inset-2 rounded-full bg-gradient-to-br from-black/10 to-transparent" />

				<motion.div
					className={`
						${innerSize} 
						flex items-center justify-center rounded-full 
						bg-gradient-to-br from-white via-gray-50 to-gray-100 
						shadow-inner border border-gray-200/50
					`}
					whileHover={!disabled ? {
						scale: 1.05,
						boxShadow: "0 0 20px rgba(255,255,255,0.3)",
					} : {}}
					transition={{ duration: 0.2 }}
				>
					<motion.img
						src={CHOICE_ICONS[choice]}
						alt={choice}
						className={`${iconSize} drop-shadow-md`}
						whileHover={!disabled ? {
							scale: 1.1,
							filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
						} : {}}
						transition={{ duration: 0.2 }}
					/>
				</motion.div>

				{showResult && isWinner && (
					<>
						{[...Array(6)].map((_, i) => (
							<motion.div
								key={i}
								className="absolute w-2 h-2 bg-yellow-400 rounded-full"
								initial={{
									scale: 0,
									x: 0,
									y: 0,
								}}
								animate={{
									scale: [0, 1, 0],
									x: Math.cos(i * 60 * (Math.PI / 180)) * 80,
									y: Math.sin(i * 60 * (Math.PI / 180)) * 80,
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									delay: i * 0.1,
									ease: "easeOut",
								}}
							/>
						))}
					</>
				)}
			</motion.button>

			<motion.div
				className="absolute -bottom-7 text-center w-full"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<span className="text-white text-sm font-semibold uppercase tracking-wider">
					{choice}
				</span>
			</motion.div>
		</motion.div>
	);
};

export default ChoiceButton;