import { useParams, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useGetPokemon } from '../../hooks/useGetPokemon';

export const PokemonDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const id = params.id || '';
    const name = params.name || '';
    const { pokemon, loading } = useGetPokemon(id, name);
    const hasPokemon = !!pokemon?.id;
    const moreThanOneType = pokemon.types?.length > 1;

    const handleHideDialog = () => {
        navigate('/pokemon');
    }

    // Only show modal if a pokemon is loading or has loaded
    if (loading && !hasPokemon) {
        return (
            <div className={classes.modal} onClick={handleHideDialog}>
                <div className={classes.modalContent}>
                    <p>...loading that Pokemon!</p>
                </div>
            </div>
        );
    }

    if (!loading && hasPokemon) {
        return (
            <div className={classes.modal} onClick={handleHideDialog}>
                <div className={classes.modalContent}>
                    {(loading && !hasPokemon) ? (
                        <p>...loading that Pokemon!</p>
                    ) : (
                        <div className={classes.cardContainer}>
                            <div className={classes.innerCardContainer}>
                                <div className={classes.contentOne}>
                                    <p className={classes.lgText}>{pokemon.name}</p>
                                    <p className={classes.lgText}>#{pokemon.number}</p>
                                </div>
                                <img className={classes.imgStyles} src={pokemon.image} alt={pokemon.name} />
                            </div>
                            <div>
                                <p className={classes.textStyles}><b>Type{moreThanOneType ? 's' : ''}:</b> {pokemon.types?.map(t => (
                                    <span key={`${pokemon.id}-${t}`} className={classes.typeContainer}>{t}</span>
                                ))}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Classification:</b> {pokemon.classification}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Weaknesses:</b> {pokemon.weaknesses?.map(t => (
                                    <span key={`${pokemon.id}-${t}`} className={classes.typeContainer}>{t}</span>
                                ))}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Resistant:</b> {pokemon.resistant?.map(t => (
                                    <span key={`${pokemon.id}-${t}`} className={classes.typeContainer}>{t}</span>
                                ))}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Flee Rate:</b> {pokemon.fleeRate}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Max CP:</b> {pokemon.maxCP}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Max HP:</b> {pokemon.maxHP}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Weight:</b> {pokemon.weight?.minimum}{" - "}{pokemon.weight?.maximum}</p>
                                <hr />
                                <p className={classes.textStyles}><b>Height:</b> {pokemon.height?.minimum}{" - "}{pokemon.height?.maximum}</p>
                                <hr />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

const useStyles = createUseStyles(
    {
        modal: {
            position: 'fixed',
            zIndex:' 1',
            paddingTop:' 100px',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor:' rgba(0,0,0,0.4)',
        },
        modalContent: {
            backgroundColor: '#7C89A3',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #888',
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '20px',
        },
        textStyles: {
            color: '#fff',
            margin: '5px'
        },
        lgText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '20px'
        },
        imgStyles: {
            objectFit: 'contain',
            width: '230px',
            height: '230px',
            alignSelf: 'center'
        },
        typeContainer: {
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: '#7d9cdc',
            marginRight: '5px'
        },
        contentOne: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        cardContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        innerCardContainer: {
            display: 'flex',
            flexDirection: 'column'
        }
    },
    { name: 'PokemonDetails' }
);