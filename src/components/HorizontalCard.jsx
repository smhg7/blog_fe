import React from 'react';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import './HorizontalCard.css';

const truncateDescription = (description, charLimit) => {
    return description.length > charLimit ? description.slice(0, charLimit) + '...' : description;
};

const HorizontalCard = ({ title, description, image, date }) => {
    description = truncateDescription(description, 350);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
        return `${day} ${monthNames[monthIndex]} ${year}`;
    };

    // Use Material-UI's useMediaQuery to detect screen size
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Use column on mobile
            alignItems: "flex-start",
            gap: "20px",
            padding: "20px",
            margin: "10px",
            borderBottom: "1px solid #ccc",
        }}>
            <Typography gutterBottom variant="h5" color='#456A8A' style={{ margin: 0 }}>
                {formatDate(date)}
            </Typography>
            <img 
                src={image}
                alt="Example"
                style={{
                    width: "200px",
                    height: "auto",
                    flex: "0 0 auto" // Prevent image from stretching
                }} 
            />
            <div style={{ flex: "1" }}>
                <h3 className="heading" style={{ margin: 0 }}>{title}</h3>
                <p>{description}</p>
            </div>  
        </div>
    );
}

export default HorizontalCard;
