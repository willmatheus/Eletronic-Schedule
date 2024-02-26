import { ReactNode, createContext, useState, useContext } from "react";

type ModalEvent = {
    openEvent: boolean;
    handleOpenEvent: () => void;
    handleCloseEvent: () => void;
};

// Fornece um valor padrão que corresponde à estrutura esperada de ModalTask
const defaultEventValue: ModalEvent = {
    openEvent: false, // Valor inicial padrão
    handleOpenEvent: () => {}, // Função vazia como placeholder
    handleCloseEvent: () => {}, // Função vazia como placeholder
};

export const ModalEventContext = createContext<ModalEvent>(defaultEventValue);

type ModalEventProviderProps = {
    children: ReactNode;
};

export const ModalEventProvider = ({ children }: ModalEventProviderProps) => {
    const [openEvent, setOpenEvent] = useState<boolean>(false);

    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    return (
        <ModalEventContext.Provider value={{ openEvent: openEvent, handleOpenEvent: handleOpenEvent, handleCloseEvent: handleCloseEvent }}>
            {children}
        </ModalEventContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useModalEvent = () => {
    const context = useContext(ModalEventContext);

    if (context === undefined) {
        throw new Error('useModalEvent must be used within a ModalEventProvider');
    }

    return context;
}