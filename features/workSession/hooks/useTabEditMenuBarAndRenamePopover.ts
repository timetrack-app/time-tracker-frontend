import { useState, useCallback } from 'react';

export const useTabEditMenuBarAndRenamePopover = () => {
  const [isOpenTabEditMenuBar, setIsOpenTabEditMenuBar] = useState(false);
  const [isOpenTabRenamePopover, setIsOpenTabRenamePopover] = useState(false);
  const [editableTabSelectorPosition, setEditableTabSelectorPosition] =
    useState<DOMRect | null>();

  const toggleTabEditMenuBar = useCallback(
    (rect: DOMRect) => {
      if (!isOpenTabEditMenuBar) setEditableTabSelectorPosition(rect);
      setIsOpenTabEditMenuBar((prev) => !prev);
    },
    [isOpenTabEditMenuBar],
  );

  const onOpenTabRenamePopover = useCallback(() => {
    setIsOpenTabEditMenuBar(false);
    setIsOpenTabRenamePopover(true);
  }, []);

  const onCloseTabRenamePopover = useCallback(() => {
    setIsOpenTabRenamePopover(false);
  }, []);

  const onCloseTabEditMenuBarAndTabRenamePopover = useCallback(() => {
    setIsOpenTabEditMenuBar(false);
    setIsOpenTabRenamePopover(false);
  }, []);

  return {
    isOpenTabEditMenuBar,
    isOpenTabRenamePopover,
    editableTabSelectorPosition,
    toggleTabEditMenuBar,
    onOpenTabRenamePopover,
    onCloseTabRenamePopover,
    onCloseTabEditMenuBarAndTabRenamePopover,
  };
};
