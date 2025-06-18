import React from "react";
import { MobileNavigation } from "../features/navigation/components/MobileNav";
import { SearchModal } from "../features/navigation/components/SearchModal";
import { LoginModal } from "../features/navigation/components/LoginModal";

const ModalProvider = ({ children }) => {
  return (
    <>
      {children}
      <MobileNavigation />
      <SearchModal />
      <LoginModal />
    </>
  );
};

export default ModalProvider;
