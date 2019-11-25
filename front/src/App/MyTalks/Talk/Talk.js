import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';

import { enqueueTalk, scheduleTalk } from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import ButtonLoading from '#shared/ButtonLoading';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { UserIcon } from '#shared/icons';
import Title from '#shared/Title';

import SelectSlot from './SelectSlot';

const Badge = ({ color, text }) => (
  <Box alignSelf="center">
    <Text color={color} weight="bold">
      {text}
    </Text>
  </Box>
);
Badge.propTypes = { color: PropTypes.string, text: PropTypes.string };

const ButtonAction = props => (
  <ButtonLoading alignSelf="center" margin={{ top: 'medium' }} {...props} />
);

const Talk = ({
  activeQueue,
  assigned,
  description,
  enqueued,
  freeSlots,
  hasAnother,
  id,
  name,
  onEnqueue,
  onSchedule,
  speaker,
  toSchedule,
}) => {
  const user = useUser();
  const [open, setOpen] = useState(false);

  const onSubmit = ({ value: { time, room } }) =>
    scheduleTalk(id, room.id, time).then(onSchedule);

  const color = assigned ? 'status-ok' : `accent-${toSchedule ? 3 : enqueued ? 2 : 4}`;
  const amTheOrganizer = user && user.id !== speaker.id;

  return (
    <Card borderColor={color}>
      <Box>
        <Title>{name}</Title>
        <Detail size="small" text={description} truncate />
        {amTheOrganizer && (
          <>
            <Detail icon={UserIcon} text={speaker.name} />
            <Detail size="small" text={speaker.email} />
          </>
        )}
      </Box>
      {assigned ? (
        <Badge color={color} text="Agendada" />
      ) : enqueued ? (
        <Badge color={color} text="Esperando turno" />
      ) : toSchedule ? (
        <ButtonAction color={color} label="Agendar" onClick={() => setOpen(true)} />
      ) : (
        activeQueue && (
          <ButtonAction
            color={color}
            disabled={!amTheOrganizer && hasAnother}
            label="Encolar"
            onClick={() => enqueueTalk(id).then(onEnqueue)}
          />
        )
      )}
      {open && freeSlots && (
        <SelectSlot
          freeSlots={freeSlots}
          name={name}
          onExit={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      )}
    </Card>
  );
};
Talk.propTypes = {
  activeQueue: PropTypes.bool.isRequired,
  assigned: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  enqueued: PropTypes.bool.isRequired,
  freeSlots: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  id: PropTypes.number.isRequired,
  hasAnother: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onEnqueue: PropTypes.func.isRequired,
  onSchedule: PropTypes.func.isRequired,
  speaker: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toSchedule: PropTypes.bool.isRequired,
};

export default Talk;
