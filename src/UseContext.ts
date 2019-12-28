
import { createContext } from 'react'

interface ContextProps {
    setPlayerValues: () => void;
    handleThemeState: () => void;
};

export const PlayerContext = createContext<Partial<ContextProps>>({})
