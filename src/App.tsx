import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGameStore } from './store/gameStore';
import Dashboard from './pages/dashboard';
import GameScreen from './pages/game-screen';
import LobbyScreen from './pages/lobby-screen';
import '@/index.css';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

const App: React.FC = () => {
	const { currentRoom } = useGameStore();

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="min-h-screen">
					<Routes>
						<Route
							path="/"
							element={
								currentRoom ? <Navigate to="/game" replace /> : <LobbyScreen />
							}
						/>
						<Route
							path="/game"
							element={
								currentRoom ? <GameScreen /> : <Navigate to="/" replace />
							}
						/>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>

					<Toaster position="bottom-right" richColors />
				</div>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
