// Contexts.tsx
import React, {createContext, useState, useContext} from 'react';

const ModalContext = createContext({
  modalVisible: false,
  setModalVisible: (visible: boolean) => {},
});

export const ModalProvider = ({children}: {children: any}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalContext.Provider value={{modalVisible, setModalVisible}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
