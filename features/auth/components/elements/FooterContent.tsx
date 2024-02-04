import Link from 'next/link';
import styled from 'styled-components';
import { vegetation } from '../../../../const/styles/colors';

const LabelSpan = styled.span`
  color: ${vegetation};
`;

type Props = {
  href: string
  message?: string
  linkLabel?: string
};

const FooterContent = ({ href, message, linkLabel }: Props) => (
  <>
    <p>{message}</p>
    <Link href={href}>
      <LabelSpan>{linkLabel}</LabelSpan>
    </Link>
  </>
);

export default FooterContent;
