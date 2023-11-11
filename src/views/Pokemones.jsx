import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import PokemonDetails from './PokemonDetails'

const Pokemones = () => {
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
                const data = await response.json();
                setPokemonList(data.results);
            } catch (error) {
                console.error('Hubo un error en el procedimiento:', error);
            }
    };

    fetchPokemonList();
    }, []);

    const irAPKMN = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
            const data = await response.json();
        setPokemonDetails({
            id: data.id,
            pkmnTitle: data.name,
            stats: data.stats[0].base_stat,
            type: data.types[0].type.name,
        });

    navigate(`/Pokemones/${selectedPokemon}`);
        } catch (error) {
    console.error('Hubo un error en el procedimiento', error);
    }
};


return (
    <div className="selectbar">
        <h1>Selecciona un Pokemon</h1>
        <select
            value={selectedPokemon}
            onChange={(event) => setSelectedPokemon(event.target.value)}
        >
        <option value="" disabled>
            Pokemones
        </option>
            {pokemonList.map((pokemon) => (
        <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
        </option>
        ))}
        </select>
        <Button onClick={irAPKMN}>
            Ver Detalle
        </Button>
        {pokemonDetails && <PokemonDetails pokemonDetails={pokemonDetails} />}
    </div>
    );
};

export default Pokemones;
