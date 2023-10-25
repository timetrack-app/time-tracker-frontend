import styled from 'styled-components';

import ButtonPrimary from '../../../../../../components/elements/common/Button/ButtonPrimary';
import Modal from '../../../../../../components/elements/common/Modal/Modal';

import InitialTaskCard from './InitialTackCard/InitialTaskCard';
import { useState } from 'react';
import { Tab } from '../../../../../../types/entity';
import { breakPoint } from '../../../../../../const/styles/breakPoint';

type SelectInitialTaskModalProps = {
  isOpen: boolean;
  tabs: Tab[];
  onClose: () => void;
  startWorkSession: () => void;
};

const BodyDiv = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

  padding: 1em 1em 2em;

  @media ${breakPoint.tablet} {
    width: 30em;
  }
`;

const MessageP = styled.p`
  font-size: 1.2em;
`;

const TaskCardsContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
`;

const FooterDiv = styled.div`
  width: 70vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media ${breakPoint.tablet} {
    width: 30em;
  }
`;

const SelectInitialTaskModal = ({
  isOpen,
  tabs,
  onClose,
  startWorkSession,
}: SelectInitialTaskModalProps) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  // temporary
  const tasks = [];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BodyDiv>
        <MessageP>Select initial task</MessageP>
        <TaskCardsContainerDiv>
          {tasks.map((task, i) => {
            return (
              <InitialTaskCard
                key={i}
                task={task}
                isSelected={i === selectedTaskIndex}
                onClick={() => setSelectedTaskIndex(i)}
              />
            );
          })}
        </TaskCardsContainerDiv>
      </BodyDiv>
      <FooterDiv>
        <ButtonPrimary onClick={() => startWorkSession()}>
          Start Session
        </ButtonPrimary>
      </FooterDiv>
    </Modal>
  );
};

export default SelectInitialTaskModal;
