import { ReactNode, createContext, useState, useContext } from "react";

type ModalMeeting = {
    openMeeting: boolean;
    handleOpenMeeting: () => void;
    handleCloseMeeting: () => void;
};

// Fornece um valor padrão que corresponde à estrutura esperada de ModalTask
const defaultMeetingTaskValue: ModalMeeting = {
    openMeeting: false, // Valor inicial padrão
    handleOpenMeeting: () => {}, // Função vazia como placeholder
    handleCloseMeeting: () => {}, // Função vazia como placeholder
};

export const ModalMeetingContext = createContext<ModalMeeting>(defaultMeetingTaskValue);

type ModalMeetingProviderProps = {
    children: ReactNode;
};

export const ModalMeetingProvider = ({ children }: ModalMeetingProviderProps) => {
    const [openMeeting, setOpenMeeting] = useState<boolean>(false);

    const handleOpenMeeting = () => setOpenMeeting(true);
    const handleCloseMeeting = () => setOpenMeeting(false);

    return (
        <ModalMeetingContext.Provider value={{ openMeeting: openMeeting, handleOpenMeeting: handleOpenMeeting, handleCloseMeeting: handleCloseMeeting }}>
            {children}
        </ModalMeetingContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useModalMeeting = () => {
    const context = useContext(ModalMeetingContext);

    if (context === undefined) {
        throw new Error('useModalMeeting must be used within a ModalTaskProvider');
    }

    return context;
}