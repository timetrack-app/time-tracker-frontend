import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi';

const CardContentDiv = styled.div`
  padding: 1em;
  margin: 0 0.5em;
  border-radius: 0.75em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ContentLeft = styled.div`
  display: flex;
  gap: 0.75em;
`;

const ContentTitle = styled.p`
  font-weight: 500;
`;

type Props = {
  title: string
  href: string
  icon: JSX.Element
};

const Content = ({ title, href, icon }: Props) => (
  <Link href={href}>
    <CardContentDiv>
      <ContentLeft>
        {icon}
        <ContentTitle>{title}</ContentTitle>
      </ContentLeft>
      <FiChevronRight size={'1.5em'} />
    </CardContentDiv>
  </Link>
);


export default Content;
