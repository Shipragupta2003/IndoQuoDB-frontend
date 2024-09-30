import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { getTransliterationLanguages } from "@ai4bharat/indic-transliterate";
import { IndicTransliterate, TriggerKeys } from "@ai4bharat/indic-transliterate";
import Bgimage from "../images/Background.png";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const [languages, setLanguages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "description": searchTerm })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFilteredMovies(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getTransliterationLanguages();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
  };

  return (
    <>
      <div style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '1',
      }}>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          width: '90%',
          maxWidth: '800px',
          margin: '40px auto 0 auto',
          zIndex: '2',
          position: 'relative',
        }}>

          <img src='/Select a language.png' alt="select a language" style={{
            width: '250px',
            height: '40px',
            margin: '200px auto 20px auto'
          }} />

          <select
            value={selectedLang}
            onChange={handleLanguageChange}
            style={{
              border: '2px solid black',
              borderRadius: '5px',
              fontSize: '14px',
              padding: '5px',
              margin: '0 auto 20px auto',
              display: 'block',
              width: '100%',
              maxWidth: '300px'
            }}>
            <option value="as">Assamese - অসমীয়া</option>
            <option value="bn">Bangla - বাংলা</option>
            <option value="brx">Boro - बड़ो</option>
            <option value="gu">Gujarati - ગુજરાતી</option>
            <option value="hi">Hindi - हिंदी</option>
            <option value="kn">Kannada - ಕನ್ನಡ</option>
            <option value="ks">Kashmiri - كٲشُر</option>
            <option value="gom">Konkani Goan - कोंकणी</option>
            <option value="mai">Maithili - मैथिली</option>
            <option value="ml">Malayalam - മലയാളം</option>
            <option value="mni">Manipuri - ꯃꯤꯇꯩꯂꯣꯟ</option>
            <option value="mr">Marathi - मराठी</option>
            <option value="ne">Nepali - नेपाली</option>
            <option value="or">Oriya - ଓଡ଼ିଆ</option>
            <option value="pa">Panjabi - ਪੰਜਾਬੀ</option>
            <option value="sa">Sanskrit - संस्कृतम्</option>
            <option value="sd">Sindhi - سنڌي</option>
            <option value="si">Sinhala - සිංහල</option>
            <option value="ta">Tamil - தமிழ்</option>
            <option value="te">Telugu - తెలుగు</option>
            <option value="ur">Urdu - اُردُو</option>
          </select>
        </div>

        <IndicTransliterate
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
          lang={selectedLang}
          triggerKeys={[
            TriggerKeys.KEY_RETURN,
            TriggerKeys.KEY_ENTER,
            TriggerKeys.KEY_SPACE,
            TriggerKeys.KEY_TAB,
          ]}
          placeholder="Type a movie quote here"
          style={{
            padding: '10px',
            margin: '-10px auto 0 auto',
            border: '2px solid black',
            borderRadius: '5px',
            fontSize: '18px',
            width: '90%',
            maxWidth: '550px',
            height: '50px',
            display: 'block',
          }}
        />

        <button
          id="search-btn"
          onClick={handleSearch}
          style={{
            display: 'block',
            margin: '20px auto',
            padding: '10px 20px',
            fontSize: '18px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#333',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          SEARCH
        </button>

        <div id="results" style={{
          color: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
          textAlign: 'center',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            searchTerm && (
              <div>
                <p>No movies found</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
