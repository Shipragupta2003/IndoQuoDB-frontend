import React from 'react';

const About = () => {
  return <div id='about'>
  <div className='about-text'>
      <img src='/About.png' alt='About' style={{marginLeft:'620px', height:'40px',marginTop:'70px',fontWeight:'bold'}}/>
      <p>BIRD (Billion Readers) and PlanetRead are non-profit organizations dedicated to improving literacy across India. Their joint initiative, the IndoQuoDB website, allows users to search for movie quotes in various Indian languages. This project supports their mission of providing accessible reading opportunities and complements their innovative approach of using same-language subtitles on TV programs to enhance reading skills among millions of weak readers.
        <br></br>
        PlanetRead, led by Director Brij Kothari and COO Nirav Kumar Shah, focuses on implementing the Same Language Subtitling (SLS) concept to boost literacy through everyday media consumption. The IndoQuoDB website, developed by Gayatri Bagul and Shipra Gupta under PlanetRead's guidance, serves as a practical tool in their broader strategy. By offering a searchable database of movie quotes in multiple Indian languages, it provides an additional avenue for reading practice and language engagement, furthering BIRD and PlanetRead's goal of creating a more literate society through innovative and accessible means.
        <br/>
      </p>
  </div>
</div>
};

export default About;
