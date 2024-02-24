import { ReactNode, createContext, useState, useContext } from "react";

type ModalTask = {
    openTask: boolean;
    handleOpenTask: () => void;
    handleCloseTask: () => void;
};

// Fornece um valor padrão que corresponde à estrutura esperada de ModalTask
const defaultModalTaskValue: ModalTask = {
    openTask: false, // Valor inicial padrão
    handleOpenTask: () => {}, // Função vazia como placeholder
    handleCloseTask: () => {}, // Função vazia como placeholder
};

export const ModalTaskContext = createContext<ModalTask>(defaultModalTaskValue);

type ModalTaskProviderProps = {
    children: ReactNode;
};

export const ModalTaskProvider = ({ children }: ModalTaskProviderProps) => {
    const [openTask, setOpenTask] = useState<boolean>(false);

    const handleOpenTask = () => setOpenTask(true);
    const handleCloseTask = () => setOpenTask(false);

    return (
        <ModalTaskContext.Provider value={{ openTask, handleOpenTask, handleCloseTask }}>
            {children}
        </ModalTaskContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useModalTask = () => {
    const context = useContext(ModalTaskContext);

    if (context === undefined) {
        throw new Error('useModalTask must be used within a ModalTaskProvider');
    }

    return context;
}