import Link from 'next/link';
import styled from 'styled-components';
import { BsFillTrashFill } from 'react-icons/bs';

const TemplateLi = styled.li`
  padding: 1em 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ListTopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const ListBottomDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TemplateNameP = styled.p`
  width: 100%;
  font-size: 1.5em;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  padding: 0;
  font-size: 1em;
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
`;

const DetailLinkP = styled.p`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
`;

type TemplateListItemProps = {
  templateId: number
  name: string
  deleteAction: (templateId: number) => void
};

const TemplateListItem = ({ templateId, name, deleteAction }: TemplateListItemProps) => (
  <TemplateLi>
    <ListTopDiv>
      <TemplateNameP>{name}</TemplateNameP>
      <DeleteButton onClick={() => deleteAction(templateId)}>
        <BsFillTrashFill />
      </DeleteButton>
    </ListTopDiv>
    <ListBottomDiv>
      {/* TODO: link to detail page */}
      <Link href="#">
        <DetailLinkP>Detail</DetailLinkP>
      </Link>
    </ListBottomDiv>
  </TemplateLi>
);

export default TemplateListItem;
