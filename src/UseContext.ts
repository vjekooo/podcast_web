
import { createContext } from 'react'

interface ContextProps {
    setPlayerValues: any;
    handleThemeState: any;
};

export const PlayerContext = createContext<Partial<ContextProps>>({})
