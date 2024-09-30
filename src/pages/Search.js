import React, { useState ,useEffect} from 'react';
import MovieCard from './MovieCard';
import { getTransliterationLanguages } from "@ai4bharat/indic-transliterate";
import { IndicTransliterate, TriggerKeys } from "@ai4bharat/indic-transliterate";

const languageOptions = [
  { code: "as", name: "Assamese - অসমীয়া" },
  { code: "bn", name: "Bangla - বাংলা" },
  { code: "brx", name: "Boro - बड़ो" },
  { code: "gu", name: "Gujarati - ગુજરાતી" },
  { code: "hi", name: "Hindi - हिंदी" },
  { code: "kn", name: "Kannada - ಕನ್ನಡ" },
  { code: "ks", name: "Kashmiri - كٲشُر" },
  { code: "gom", name: "Konkani Goan - कोंकणी" },
  { code: "mai", name: "Maithili - मैथिली" },
  { code: "ml", name: "Malayalam - മലയാളം" },
  { code: "mni", name: "Manipuri - ꯃꯤꯇꯩꯂꯣꯟ" },
  { code: "mr", name: "Marathi - मराठी" },
  { code: "ne", name: "Nepali - नेपाली" },
  { code: "or", name: "Oriya - ଓଡ଼ିଆ" },
  { code: "pa", name: "Panjabi - ਪੰਜਾਬੀ" },
  { code: "sa", name: "Sanskrit - संस्कृतम्" },
  { code: "sd", name: "Sindhi - سنڌي" },
  { code: "si", name: "Sinhala - සිංහල" },
  { code: "ta", name: "Tamil - தமிழ்" },
  { code: "te", name: "Telugu - తెలుగు" },
  { code: "ur", name: "Urdu - اُردُو" }
];


function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const [languages, setLanguages] = useState([])
  

  const handleChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);

  }

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({"description":searchTerm})
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Search results:', data);
      
      // Flatten the data to directly access rows for renderiing
      console.log(data);

      setFilteredMovies(data);
     

    } catch (error) {
      console.error('Error searching:', error);
      // Handle error gracefully
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getTransliterationLanguages();
        setLanguages(data); // Assuming data is an array of language codes and names
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
    <div className="App">
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0', backgroundColor: '#' }}>
      <select
        id="languageSelect"
        value={selectedLang}
        onChange={handleLanguageChange}
        className="select"
      >
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
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
        style={{
          marginTop: '40px', marginLeft:'4px',
          padding: '10px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          width: '500px',
          height: '50px'
        }}
      />

        <button
          id="search-btn"
          onClick={handleSearch}
          style={{ marginTop: '40px',marginLeft:'3px', padding: '10px 10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', height: '50px' }}
        >
          SEARCH
        </button>
      </header>
      <main id="results" style={{ color: 'white' }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <MovieCard movie={movie} className="gradient-background" />
            </div>
          ))
        ) : (
          searchTerm && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p>No movies found</p>
            </div>
      )
    )}
  </main>
    </div>
  );
}

export default Search;

