import { Card, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

import '../../globalStyle.scss'
import projectImg from './project.png'

import './card.scss'

export function GlobalCard({id, title, description,imgUrl=projectImg, linkTo, moreDescription}) {
  // const navigate = useNavigate();
  console.log(linkTo);
  return (
    <div className='card-container'>
    <Card
      shadow="sm"
      p="xl"
      component={Link}
      to={linkTo}
      // onClick={(e)=>{e.preventDefault(); navigate(linkTo)}}
      fontFamily="OpenSans"
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