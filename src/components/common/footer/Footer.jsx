import Link from 'next/link';
import React from 'react';
import { Section, Div } from '../../../shared';
import {
  FooterContainer,
  FooterItem,
  H6,
  UnorderList,
  List,
  StyledLink,
  FooterAboutContainer,
} from './footerStyle';
import { footerItem } from './footer_item';

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


function Footer() {
  return (
    <Section>
      <Div>
        <FooterContainer>
          {footerItem.map((data, index) => {
            return <FooterChunk key={index} parentItem={data} />;
          })}
        </FooterContainer>

        <FooterAboutContainer>
          <p>
            Slashit is a product of Slashit Payments Limited, a private company
            registered under the company acts of the Federal Republic of
            Nigeria. The Slashit card is powered by Flutterwave and can be used
            to make local and international payments.
          </p>

          <p>
            1When you pay anyone on Slashit they need a Slashit business account
            to claim the funds, they can sign up for a Slashit business account
            free of charge.
          </p>

          <p>© 2022, Slashit. All rights reserved</p>
        </FooterAboutContainer>
      </Div>
    </Section>
  );
}

export default Footer;
