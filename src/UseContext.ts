
import { createContext } from 'react'
import { Episode } from './models/models'

interface Values {
	episode: Episode | null;
	isPlayerVisible: boolean;
}

interface ContextProps {
    setPlayerValues: (values: Values) => void;
    handleThemeState: () => void;
    user: string;
};

export const PlayerContext = createContext<Partial<ContextProps>>({})
