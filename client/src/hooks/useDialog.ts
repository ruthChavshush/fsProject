import { useState } from 'react';

function useDialog(defaultValue: boolean = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}

export default useDialog;
