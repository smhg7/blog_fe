import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const truncateDescription = (description, charLimit) => {
    if (description.length > charLimit) {
      return description.slice(0, charLimit) + '...';
    }
    return description;
 };



export default function ActionAreaCard({title, description, image, date}) {
    description = truncateDescription(description,112);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {date}
            <br />
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}