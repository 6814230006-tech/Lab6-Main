import TypeBadge from './TypeBadge';
import type { PokemonCardData } from '../types/pokemon';
import './PokemonCard.css';

interface PokemonCardProps {
    pokemon: PokemonCardData;
    onFavoriteClick?: (id: number) => void;
    isFavorite?: boolean;
}

function PokemonCard({
                         pokemon,
                         onFavoriteClick,
                         isFavorite = false
                     }: PokemonCardProps) {
    // Format Pokemon ID: 1 -> #001
    const formatId = (id: number): string => {
        return `#${id.toString().padStart(3, '0')}`;
    };

    // Capitalize first letter
    const formatName = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const handleFavoriteClick = () => {
        if (onFavoriteClick) {
            onFavoriteClick(pokemon.id);
        }
    };

    return (
        <div className="pokemon-card">
            {/* Favorite Button */}
            <button
                className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            {/* Pokemon Image */}
            <div className="pokemon-image">
                <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    loading="lazy"
                />
            </div>

            {/* Pokemon Info */}
            <div className="pokemon-info">
                <span className="pokemon-id">{formatId(pokemon.id)}</span>
                <h3 className="pokemon-name">{formatName(pokemon.name)}</h3>

                {/* Types */}
                <div className="pokemon-types">
                    {pokemon.types.map((type) => (
                        <TypeBadge key={type} typeName={type} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;

