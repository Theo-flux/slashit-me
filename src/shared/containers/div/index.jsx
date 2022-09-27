import React from 'react';
import { DivContainer, NavContainer } from './div';

export function Div({ children }) {
  return <DivContainer>{children}</DivContainer>;
}

export function NavWrapper({ children }) {
  return <NavContainer>{children}</NavContainer>;
}