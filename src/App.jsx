import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Context from './context/my_context'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Pokemones from './views/Pokemones'
import PokemonDetails from './views/PokemonDetails'
import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [info, setInfo] = useState([]);

  const consultarAPI = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/';
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        const allPkmn = await Promise.all(
          data.results.map(async (item) => {
            const pkmnResponse = await fetch(item.url);
            const pkmnData = await pkmnResponse.json();

            return {
              pkmnTitle: item.name,
              stats: pkmnData.stats[0].base_stat,
              type: pkmnData.types[0].type.name,
            };
          })
        );
        setInfo(allPkmn);
      }
    } catch (error) {
      console.error('Hubo un error en el procedimiento:', error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
      <Context.Provider value={{ info, setInfo }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pokemones/*" element={<Pokemones />} />
          <Route path="/Pokemones/:pokemonName" element={<PokemonDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context.Provider>
  );
};

export default App;
