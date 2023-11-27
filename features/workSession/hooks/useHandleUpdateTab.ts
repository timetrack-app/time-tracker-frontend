import { useState, useCallback } from 'react';

export const useHandleUpdateTab = () => {
  const [isOpenMenubar, setIsOpenMenubar] = useState(false);
  const [isOpenRenamePopover, setIsOpenRenamePopover] = useState(false);
  const [editableTabSelectorPosition, setEditableTabSelectorPosition] =
    useState<DOMRect | null>();

  const toggleMenuBar = useCallback(
    (rect: DOMRect) => {
      if (!isOpenMenubar) setEditableTabSelectorPosition(rect);
      setIsOpenMenubar((prev) => !prev);
    },
    [isOpenMenubar],
  );

  const onOpenRenamePopover = useCallback(() => {
    setIsOpenMenubar(false);
    setIsOpenRenamePopover(true);
  }, []);

  const onCloseRenamePopover = useCallback(() => {
    setIsOpenRenamePopover(false);
  }, []);

  const onCloseMenuBarAndRenamePopover = useCallback(() => {
    setIsOpenMenubar(false);
    setIsOpenRenamePopover(false);
  }, []);

  return {
    isOpenMenubar,
    isOpenRenamePopover,
    editableTabSelectorPosition,
    toggleMenuBar,
    onOpenRenamePopover,
    onCloseRenamePopover,
    onCloseMenuBarAndRenamePopover,
  };
};
