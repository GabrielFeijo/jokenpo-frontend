/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'scissors-from': 'hsl(39, 89%, 49%)',
				'scissors-to': 'hsl(40, 84%, 53%)',
				'paper-from': 'hsl(230, 89%, 62%)',
				'paper-to': 'hsl(230, 89%, 65%)',
				'rock-from': 'hsl(349, 71%, 52%)',
				'rock-to': 'hsl(349, 70%, 56%)',
				'lizard-from': 'hsl(261, 73%, 60%)',
				'lizard-to': 'hsl(261, 72%, 63%)',
				'spock-from': 'hsl(189, 59%, 53%)',
				'spock-to': 'hsl(189, 58%, 57%)',

				'dark-text': 'hsl(229, 25%, 31%)',
				'score-text': 'hsl(229, 64%, 46%)',
				'header-outline': 'hsl(217, 16%, 45%)',

				'bg-from': 'hsl(214, 47%, 23%)',
				'bg-to': 'hsl(237, 49%, 15%)',
			},
			fontFamily: {
				barlow: ['Barlow Semi Condensed', 'sans-serif'],
			},
			fontWeight: {
				semibold: '600',
				bold: '700',
			},
			backgroundImage: {
				'scissors-gradient':
					'linear-gradient(135deg, hsl(39, 89%, 49%) 0%, hsl(40, 84%, 53%) 100%)',
				'paper-gradient':
					'linear-gradient(135deg, hsl(230, 89%, 62%) 0%, hsl(230, 89%, 65%) 100%)',
				'rock-gradient':
					'linear-gradient(135deg, hsl(349, 71%, 52%) 0%, hsl(349, 70%, 56%) 100%)',
				'lizard-gradient':
					'linear-gradient(135deg, hsl(261, 73%, 60%) 0%, hsl(261, 72%, 63%) 100%)',
				'spock-gradient':
					'linear-gradient(135deg, hsl(189, 59%, 53%) 0%, hsl(189, 58%, 57%) 100%)',
				'radial-bg':
					'radial-gradient(circle at center, hsl(214, 47%, 23%) 0%, hsl(237, 49%, 15%) 100%)',
			},
			animation: {
				'bounce-slow': 'bounce 2s infinite',
				'pulse-slow': 'pulse 3s infinite',
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
