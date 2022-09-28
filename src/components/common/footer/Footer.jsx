import Link from 'next/link';
import React from 'react';
import { Section, Div, GetAppButton } from '../../../shared';
import {
  FooterContainer,
  FooterItem,
  H6,
  UnorderList,
  List,
  StyledLink,
  FooterAboutContainer,
  Wrapper,
} from './footerStyle';
import { footerItem, appItem, socialItem } from './footer_item';

const FooterChunk = ({ parentItem }) => {
  const { children, parent } = parentItem;
  return (
    <FooterItem>
      <H6>{parent}</H6>

      <UnorderList>
        {children.map((child, index) => {
          const { to, name } = child;
          return (
            <List key={index}>
              <Link href={to} passHref>
                <StyledLink target="_blank" rel="noopener noreferrer">
                  {name}
                </StyledLink>
              </Link>
            </List>
          );
        })}
      </UnorderList>
    </FooterItem>
  );
};

function Footer({ children }) {
  return (
    <Section>
      <Div>
        <FooterContainer>
          {footerItem.map((data, index) => {
            return <FooterChunk key={index} parentItem={data} />;
          })}

          <Wrapper>
            <div>
              {appItem.map((item, index) => {
                return <GetAppButton key={index} data={item} />;
              })}
            </div>

            <p>connect with us</p>
          </Wrapper>
        </FooterContainer>

        <FooterAboutContainer>
          <p>
            Slashit is a product of Slashit Payments Limited, a private company
            registered under the company acts of the Federal Republic of
            Nigeria. The Slashit card is powered by Flutterwave and can be used
            to make local and international payments.
          </p>
          {children}
          <p>© 2022, Slashit. All rights reserved</p>
        </FooterAboutContainer>
      </Div>
    </Section>
  );
}

export default Footer;
