import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Box, Button, Grid, Layer } from 'grommet';
import { FormClose, Schedules, Home, User } from 'grommet-icons';
import Slider from 'react-slick';

import { useGetOS } from '#helpers/api/os-client';
import MyProps from '#helpers/MyProps';
import useSlots from '#helpers/schedule-socket';
import { useUser } from '#helpers/useAuth';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import MainHeader from '#shared/MainHeader';
import Row from '#shared/Row';
import Title from '#shared/Title';

const sliderSettings = {
  centerMode: true,
  arrows: false,
  dots: false,
  infinite: true,
  speed: 50,
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 960,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Talks = ({ children }) => <Slider {...sliderSettings}>{children}</Slider>;
Talks.propTypes = { children: MyProps.children.isRequired };

const DescriptionInfo = ({ info, onClose }) => (
  <Layer onClickOutside={onClose} onEsc={onClose}>
    <Box pad={{ horizontal: 'medium', bottom: 'medium', top: 'small' }}>
      <Row justify="end">
        <Button icon={<FormClose />} onClick={onClose} plain />
      </Row>
      {info}
    </Box>
  </Layer>
);
DescriptionInfo.propTypes = {
  info: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ButtonMoreInfo = ({ onClick }) => (
  <Button
    alignSelf="center"
    color="accent-3"
    label="Mas Info"
    onClick={onClick}
    primary
  />
);
ButtonMoreInfo.propTypes = { onClick: PropTypes.func.isRequired };

const Talk = ({ talk: { description, name, speaker }, room }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card borderColor="accent-3" height="230px" margin="xsmall">
        <Box>
          <Box overflow="hidden">
            <Title>{name}</Title>
          </Box>
          <Detail icon={User} text={speaker.name} />
          <Detail icon={Home} text={room.name} />
        </Box>
        {description && <ButtonMoreInfo onClick={() => setOpen(true)} />}
      </Card>
      {open && <DescriptionInfo info={description} onClose={() => setOpen(false)} />}
    </>
  );
};
Talk.propTypes = {
  room: PropTypes.shape().isRequired,
  talk: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    speaker: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

const Dots = ({ gridArea }) => (
  <Box
    alignSelf="center"
    border={{ size: 'xsmall', style: 'dashed' }}
    gridArea={gridArea}
  />
);
Dots.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

const HourHeader = ({ hour }) => (
  <Grid
    areas={[['left', 'main', 'right']]}
    columns={['flex', 'xsmall', 'flex']}
    rows={['xxsmall']}
  >
    <Dots gridArea="left" />
    <Box align="center" alignSelf="center" gridArea="main" flex>
      {`${hour}:00 hs`}
    </Box>
    <Dots gridArea="right" />
  </Grid>
);
HourHeader.propTypes = {
  hour: PropTypes.number.isRequired,
};

const TimeSpan = ({ hour, slots }) => (
  <>
    <HourHeader hour={hour} />
    {slots.length === 0 ? (
      <Box height="small" />
    ) : (
      <Talks>
        {slots.map(({ talk, room }) => (
          <Talk key={talk.id} talk={talk} room={room} />
        ))}
      </Talks>
    )}
  </>
);
TimeSpan.propTypes = {
  hour: PropTypes.number.isRequired,
  slots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const getHour = time => Number(time.slice(0, 2));
const getRangeHours = (start, end) =>
  [...Array(getHour(end) + 1).keys()].slice(getHour(start));

const Schedule = ({ slots, startTime, endTime }) =>
  getRangeHours(startTime, endTime).map(hour => {
    const slotsHour = slots.filter(s => s.hour === hour);
    const key = `${hour}-${slotsHour.map(s => s.id).join('-')}`;
    return <TimeSpan hour={hour} key={key} slots={slotsHour} />;
  });

const OpenSpace = ({
  match: {
    params: { id },
  },
  history,
  location: { pathname },
}) => {
  const [{ name, startTime = '1', endTime = '0' }] = useGetOS(id, () =>
    history.push('/')
  );
  const user = useUser();
  const slots = useSlots(id);
  return (
    <>
      <MainHeader>
        <MainHeader.Title label={name} />
        <MainHeader.SubTitle icon={<Schedules color="dark-5" />} label="AGENDA" />
        <MainHeader.Button
          color="accent-1"
          label="Mis charlas"
          onClick={() => history.push(user ? `${pathname}/mis-charlas` : '/login')}
        />
      </MainHeader>
      <Box margin={{ bottom: 'medium' }}>
        <Schedule slots={slots} startTime={startTime} endTime={endTime} />
      </Box>
    </>
  );
};
OpenSpace.propTypes = {
  history: MyProps.history,
  location: MyProps.location,
  match: MyProps.match,
};

export default OpenSpace;
