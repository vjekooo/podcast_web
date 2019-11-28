
import { createContext } from 'react'

interface ContextProps {
    setPlayerValues: any;
};

export const PlayerContext = createContext<Partial<ContextProps>>({})
