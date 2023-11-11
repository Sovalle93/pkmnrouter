import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {
    const { pokemonName } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();

    setPokemonDetails((prevDetails) => ({
        ...prevDetails,
        img: data.sprites.other.dream_world.front_default,
        pkmnTitle: data.name,
        stats: data.stats.map((stat) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
            })),
        type: data.types[0].type.name,
            }));
        } catch (error) {
            console.error('Hubo un error en el procedimiento', error);
        }
    };

    fetchPokemonDetails();
    }, [pokemonName]);

return (
    <section>
        <h2>{pokemonDetails ? `${pokemonDetails.pkmnTitle} ` : 'Loading...'}</h2>
        {pokemonDetails && (
        <div>
            <img
                src={pokemonDetails.img}
                alt={pokemonDetails.pkmnTitle}
            />
            <p>Type: {pokemonDetails.type}</p>
            <h3>Stats:</h3>
                <ul>
                    {pokemonDetails.stats.map((stat) => (
                        <li key={stat.name}>
                            {stat.name}: {stat.base_stat}
                        </li>
                    ))}
                </ul>
        </div>
        )}
    </section>
    );
};

export default PokemonDetails;


