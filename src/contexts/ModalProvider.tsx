// components/Modal/ModalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Tipos de mensagem para diferentes estilos visuais no modal (opcional)
type MessageType = "success" | "error" | "info" | "warning";

// Interface para o estado do modal
interface ModalState {
  isOpen: boolean;
  message: string;
  type: MessageType;
  onConfirm?: () => void; // Para modais de confirmação
  onCancel?: () => void; // Para modais de confirmação
}

// Interface para o contexto do modal
interface ModalContextType {
  showModal: (
    message: string,
    type?: MessageType,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => void;
  hideModal: () => void;
  modalState: ModalState;
}

// Cria o contexto
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

// Provedor do contexto do modal
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: "",
    type: "info", // Tipo padrão
  });

  // Função para exibir o modal
  const showModal = useCallback(
    (
      message: string,
      type: MessageType = "info",
      onConfirm?: () => void,
      onCancel?: () => void
    ) => {
      setModalState({
        isOpen: true,
        message,
        type,
        onConfirm,
        onCancel,
      });
    },
    []
  );

  // Função para esconder o modal
  const hideModal = useCallback(() => {
    setModalState({
      isOpen: false,
      message: "",
      type: "info",
      onConfirm: undefined,
      onCancel: undefined,
    });
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalState }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar o contexto do modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }
  return context;
};
