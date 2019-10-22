import React from 'react';

import PropTypes from 'prop-types';
import { Box, Text, Button } from 'grommet';

import MyProps from '#helpers/MyProps';
import useSize from '#helpers/useSize';
import ButtonNew from './ButtonNew';
import Row from './Row';
import RowBetween from './RowBetween';
import Title from './Title';

const useTextAlign = () => (useSize() === 'small' ? 'center' : 'start');

const MyTitle = ({ children, icon: Icon, label, ...props }) => (
  <Title level="2" textAlign={useTextAlign()} {...props}>
    <Row>
      {Icon && <Icon />}
      {label}
      {children}
    </Row>
  </Title>
);
MyTitle.propTypes = {
  children: MyProps.children,
  icon: PropTypes.func,
  label: PropTypes.string,
};

const MyTitleLink = props => (
  <MyTitle>
    <Button hoverIndicator plain {...props} />
  </MyTitle>
);

const MySubTitle = ({ children, icon: Icon, label, ...props }) => (
  <Text color="dark-5" size="large" textAlign={useTextAlign()} {...props}>
    <Row>
      {Icon && <Icon color="dark-5" />}
      {label}
      {children}
    </Row>
  </Text>
);
MySubTitle.propTypes = {
  children: MyProps.children,
  icon: PropTypes.func,
  label: PropTypes.string,
};

const MyButton = props => <Button fill="vertical" primary {...props} />;

const getByType = (children, type) => children.find(c => c.type === type);

const MainHeader = ({ children, ...props }) => {
  const isSmall = useSize() === 'small';
  const childs = React.Children.toArray(children);
  const title = getByType(childs, MyTitle) || getByType(childs, MyTitleLink);
  const subtitle = getByType(childs, MySubTitle);
  const button = getByType(childs, MyButton) || getByType(childs, ButtonNew);
  return (
    <RowBetween
      direction={isSmall ? 'column' : 'row'}
      margin={{ vertical: isSmall ? 'large' : 'medium' }}
    >
      <Box
        align={isSmall ? 'center' : undefined}
        margin={{ bottom: isSmall && button ? 'large' : undefined }}
        {...props}
      >
        {title}
        {subtitle}
      </Box>
      {button}
    </RowBetween>
  );
};
MainHeader.propTypes = { children: MyProps.children.isRequired };

MainHeader.Title = MyTitle;
MainHeader.TitleLink = MyTitleLink;
MainHeader.SubTitle = MySubTitle;
MainHeader.Button = MyButton;
MainHeader.ButtonNew = ButtonNew;

export default MainHeader;