import { Card, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../../globalStyle.scss'
import projectImg from './project.png'

import './card.scss'

export function CardTimeRange({id, title, description,imgUrl=projectImg, moreDescription}) {
  return (
    <div className='card-container'>
    <Card
      shadow="sm"
      p="xl"
      component={Link}
      to={`/timeRange`}
      fontFamily="Source Sans Pro"
    > 
      <Card.Section >
        <Image
          height={160}
          alt="No way!"
          src={imgUrl}
          fit='contain'
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md" color='#e0e0e0'   >
        {title}
      </Text>

      <Text mt="xs" size="sm" color="#70d8bd"  >
        {description}
      </Text>
      <Text mt="xs" color="#e0e0e0" size="sm" >
        {moreDescription ?? ''}
      </Text>
    </Card>
    </div>
  );
}