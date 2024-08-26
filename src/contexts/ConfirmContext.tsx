import ConfirmModal from "@/components/modal/ConfirmModal";
import { createContext, useContext, useState } from "react";

type Type = {
  customConfirm: (message: string) => Promise<boolean>;
};

const ConfirmContext = createContext<Type>({
  customConfirm: () => new Promise((_, reject) => reject()),
});

interface ConfirmModalState {
  message: string;
  onClickOK: () => void;
  onClickCancel: () => void;
}
//@ts-ignore
export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState<ConfirmModalState>();
  const customConfirm = (message?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        message: message ?? "",
        onClickOK: () => {
          setState(undefined);
          resolve(true);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(false);
        },
      });
    });
  };
  return (
    <ConfirmContext.Provider value={{ customConfirm }}>
      {children}
      {state && (
        <ConfirmModal
          message={state.message}
          onClickOK={state.onClickOK}
          onClickCancel={state.onClickCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
