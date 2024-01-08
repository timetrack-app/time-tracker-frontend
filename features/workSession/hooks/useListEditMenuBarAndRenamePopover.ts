import { useState, useCallback } from 'react';
import { TaskList } from '../../../types/entity';

export const useListEditMenuBarAndRenamePopover = () => {
  const [isOpenListEditMenuBar, setIsOpenListEditMenuBar] = useState(false);
  const [isOpenListRenamePopover, setIsOpenListRenamePopover] = useState(false);
  const [listPosition, setEditableListSelectorPosition] =
    useState<DOMRect | null>();

  const [currentList, setCurrentList] = useState<TaskList>();

  const toggleListEditMenuBar = useCallback(
    (rect: DOMRect, list?: TaskList) => {
      if (!isOpenListEditMenuBar && list) {
        setCurrentList(list);
        setEditableListSelectorPosition(rect);
      } else setCurrentList(undefined);
      setIsOpenListEditMenuBar((prev) => !prev);
    },
    [isOpenListEditMenuBar],
  );

  const onOpenListRenamePopover = useCallback(() => {
    setIsOpenListEditMenuBar(false);
    setIsOpenListRenamePopover(true);
  }, []);

  const onCloseListRenamePopover = useCallback(() => {
    setIsOpenListRenamePopover(false);
  }, []);

  const onCloseListEditMenuBarAndListRenamePopover = useCallback(() => {
    setIsOpenListEditMenuBar(false);
    setIsOpenListRenamePopover(false);
  }, []);

  return {
    isOpenListEditMenuBar,
    isOpenListRenamePopover,
    listPosition,
    currentList,
    toggleListEditMenuBar,
    onOpenListRenamePopover,
    onCloseListRenamePopover,
    onCloseListEditMenuBarAndListRenamePopover,
  };
};
