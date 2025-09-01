import { Choice, CHOICE_ICONS } from '@/types/game';
import { motion } from 'framer-motion';

export const getChoiceIcon = (choice: Choice) => (
	<motion.img
		src={CHOICE_ICONS[choice]}
		alt={choice}
		className="h-6 w-6"
		whileHover={{ scale: 1.2, rotate: 5 }}
		transition={{ duration: 0.2 }}
	/>
);
