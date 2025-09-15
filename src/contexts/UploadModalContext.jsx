import React, { createContext, useContext, useState } from "react";

// ✅ Create a context for managing the upload modal state
const UploadModalContext = createContext(undefined);

// ✅ Provider component to wrap parts of the app that need this state
export const UploadModalProvider = ({ children }) => {
  // State to track whether the upload modal is open or closed
  const [isUploadOpen, setUploadOpen] = useState(false);

  // Function to open the modal
  const openUploadModal = () => setUploadOpen(true);

  // Function to close the modal
  const closeUploadModal = () => setUploadOpen(false);

  return (
    // Provide modal state and actions to child components
    <UploadModalContext.Provider
      value={{ isUploadOpen, openUploadModal, closeUploadModal }}
    >
      {children}
    </UploadModalContext.Provider>
  );
};

// ✅ Custom hook for easy access to modal state and functions
export const useUploadModal = () => {
  const context = useContext(UploadModalContext);
  // If used outside the provider, throw an error
  if (context === undefined) {
    throw new Error(
      "useUploadModal must be used within an UploadModalProvider"
    );
  }
  return context; // Return the modal context (state + actions)
};
