import { Choice, CHOICE_ICONS } from '@/types/game';
import { motion } from 'framer-motion';

interface ChoiceButtonProps {
	choice: Choice;
	onClick: () => void;
	disabled?: boolean;
	size?: 'normal' | 'large';
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
	choice,
	onClick,
	disabled = false,
	size = 'normal',
}) => {
	const getGradientClass = (choice: Choice) => {
		const gradients = {
			ROCK: 'bg-gradient-to-br from-rock-from to-rock-to',
			PAPER: 'bg-gradient-to-br from-paper-from to-paper-to',
			SCISSORS: 'bg-gradient-to-br from-scissors-from to-scissors-to',
			LIZARD: 'bg-gradient-to-br from-lizard-from to-lizard-to',
			SPOCK: 'bg-gradient-to-br from-spock-from to-spock-to',
		};
		return gradients[choice];
	};

	const sizeClasses =
		size === 'large'
			? 'w-32 h-32 md:w-40 md:h-40'
			: 'w-24 h-24 md:w-28 md:h-28';

	return (
		<motion.button
			whileHover={{ scale: disabled ? 1 : 1.05 }}
			whileTap={{ scale: disabled ? 1 : 0.95 }}
			onClick={onClick}
			disabled={disabled}
			className={` ${sizeClasses} ${getGradientClass(choice)} relative flex items-center justify-center rounded-full shadow-lg transition-all duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:shadow-xl'} `}
		>
			<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-inner md:h-20 md:w-20">
				<img
					src={CHOICE_ICONS[choice]}
					alt={choice}
					className="h-8 w-8 md:h-10 md:w-10"
				/>
			</div>
		</motion.button>
	);
};

export default ChoiceButton;
