
import { createContext } from 'react'
import { Episode } from './models/models'

interface Values {
	episode: Episode | null;
	isPlayerVisible: boolean;
}

interface ContextProps {
    setPlayerValues: (values: Values) => void;
    handleUser: (value: string) => void;
    changeTheme: () => void;
    user: string;
    theme: string;
};

export const PlayerContext = createContext<Partial<ContextProps>>({})
