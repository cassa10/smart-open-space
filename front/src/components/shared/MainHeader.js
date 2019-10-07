import React from 'react';

import PropTypes from 'prop-types';
import { Box, Heading, Text, Button } from 'grommet';

import useSize from '#helpers/useSize';
import RowBetween from './RowBetween';
import ButtonNew from './ButtonNew';

const useTextAlign = () => {
  const size = useSize();
  return size === 'small' ? 'center' : 'start';
};

const Row = ({ children, ...props }) => (
  <Box align="center" direction="row" gap="small" {...props}>
    {children}
  </Box>
);
Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const MyTitle = ({ children, icon, label, ...props }) => {
  const textAlign = useTextAlign();
  return (
    <Heading level="2" margin="none" textAlign={textAlign} {...props}>
      <Row>
        {icon}
        {label}
        {children}
      </Row>
    </Heading>
  );
};
MyTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  icon: PropTypes.node,
  label: PropTypes.string,
};

const MyTitleLink = props => (
  <MyTitle>
    <Button hoverIndicator plain {...props} />
  </MyTitle>
);

const MySubTitle = ({ children, icon, label, ...props }) => {
  const textAlign = useTextAlign();
  return (
    <Text color="dark-5" size="large" textAlign={textAlign} {...props}>
      <Row>
        {icon}
        {label}
        {children}
      </Row>
    </Text>
  );
};
MySubTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  icon: PropTypes.node,
  label: PropTypes.string,
};

const MyButton = props => <Button fill="vertical" primary {...props} />;

const getByType = (children, type) => children.find(c => c.type === type);

const MainHeader = ({ children, ...props }) => {
  const size = useSize();
  const childs = React.Children.toArray(children);
  const title = getByType(childs, MyTitle) || getByType(childs, MyTitleLink);
  const subtitle = getByType(childs, MySubTitle);
  const button = getByType(childs, MyButton) || getByType(childs, ButtonNew);
  return (
    <RowBetween
      direction={size === 'small' ? 'column' : 'row'}
      margin={{ vertical: size === 'small' ? 'large' : 'medium' }}
    >
      <Box
        align={size === 'small' ? 'center' : undefined}
        margin={{ bottom: size === 'small' && button ? 'large' : undefined }}
        {...props}
      >
        {title}
        {subtitle}
      </Box>
      {button}
    </RowBetween>
  );
};
MainHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

MainHeader.Title = MyTitle;
MainHeader.TitleLink = MyTitleLink;
MainHeader.SubTitle = MySubTitle;
MainHeader.Button = MyButton;
MainHeader.ButtonNew = ButtonNew;

export default MainHeader;
