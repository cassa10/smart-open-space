import React from 'react';

import { Box, Grid } from 'grommet';

import MyProps from '#helpers/MyProps';
import useSize from '#helpers/useSize';

const smallLayout = {
  areas: [['header'], ['main']],
  columns: ['flex'],
  pad: { horizontal: 'medium' },
};
const mediumLayout = {
  areas: [['headerL', 'header', 'headerR'], ['l', 'main', 'r']],
  columns: ['flex', 'large', 'flex'],
  pad: undefined,
};
const largeLayout = { ...mediumLayout, columns: ['flex', 'xlarge', 'flex'] };

const useMainLayout = () =>
  ({ small: smallLayout, medium: mediumLayout, large: largeLayout }[useSize()]);

const BoxBrand = ({ children, ...props }) => (
  <Box background="brand" {...props}>
    {children}
  </Box>
);
BoxBrand.propTypes = { children: MyProps.children };

const MainLayout = ({ children, header }) => {
  const { areas, columns, pad } = useMainLayout();
  return (
    <Box fill background="light-3" overflow="auto">
      <Grid areas={areas} columns={columns} fill rows={['xxsmall', 'flex']}>
        <BoxBrand gridArea="headerL" />
        <BoxBrand gridArea="headerR" />
        <BoxBrand gridArea="header" pad={pad}>
          {header}
        </BoxBrand>
        <Box as="main" gridArea="main" pad={pad}>
          <div>{children}</div>
        </Box>
      </Grid>
    </Box>
  );
};
MainLayout.propTypes = {
  children: MyProps.children.isRequired,
  header: MyProps.children.isRequired,
};

export default MainLayout;
