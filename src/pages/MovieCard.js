import React, { useState } from 'react';
import warImage from '../images/war.jpg';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={isHovered ? { ...styles.card, ...styles.cardHover } : styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={warImage} alt={movie.table_name} style={styles.image} />
      <div style={styles.details}>
        <h3 style={styles.title}>{movie.table_name}</h3>
        <p style={styles.context}>{movie.context}</p>
        <small style={styles.time}>{movie.time_in}</small>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor:'white',
    border: '1px solid #e0e0e0',
    padding: '20px',
    borderRadius: '12px',
    height:'200px',
    
    width: '300px',
    margin: '20px auto'
    
  },
  image: {
    width: '60px',
    height: 'auto',
    borderRadius: '8px',
    marginRight: '20px',
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#333',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  context: {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '15px',
    fontFamily: 'Roboto, sans-serif',
  },
  time: {
    color: '#999',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#208111',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#186a0c',
  },
  cardHover: {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
    transition: 'transform 0.3s ease-in-out', // Add transition for smooth scaling
    '&:hover': {
      transform: 'scale(1.03)',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#1a0d0d', // Color change on hover
        opacity: '0.3', // Adjust opacity as desired
        zIndex: '-1', // Behind the card content
      }
    
}}};

export default MovieCard;
