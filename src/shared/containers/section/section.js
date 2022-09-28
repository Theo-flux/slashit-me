import styled from 'styled-components';

export const SectionContainer = styled.div`
  position: ${(props) => props.type || 'static'};
  z-index: ${(props) => (props.type === `fixed` ? '2' : '1')};
  background-color: ${(props) => props.bg || 'white'};
  ${(props) =>
    props.type && `filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));`}
  width: 100%;
`;
