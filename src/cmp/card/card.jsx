import { Card, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

// import calendarImg from './calendar.png'

import './card.scss'

export function CardTimeRange({id, title, description}) {
  return (
    <div className='card-container'>
    <Card
      shadow="sm"
      p="xl"
      // component="a"
      // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      // target="_blank"
      component={Link}
      to={`/timeRange`}
      // to={`/timeRange/${id}`}
      paddingtop="0px"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        //   src="https://www.shutterstock.com/image-vector/schedule-vector-icon-260nw-529312951.jpg"
        //   src={require(calendarImg)}
          // src={calendarImg}
          height={100}
          alt="No way!"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        {title}
      </Text>

      <Text mt="xs" color="dimmed" size="sm">
        {description}
      </Text>
    </Card>
    </div>
  );
}