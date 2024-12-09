import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useGetPokemons, Pokemon } from '../../hooks/useGetPokemons';
import { useSearch } from '../../contexts';

export const PokemonList = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const { searchText, setSearchText } = useSearch();
  const hasList = pokemons.length > 0;

  const handleSearch = (event: React.BaseSyntheticEvent<Event>) => {
    const value = event.target?.value;
    if (!value) setSearchText('');
    else setSearchText(value)
  }

  const handleShowDialog = (id: Pokemon['id'], name: Pokemon['name']) => {
    navigate(`/pokemon/${name}/${id}`);
  }

  const filterList = () => {
    if (hasList) {
        // Allow case insensative
        const lowerCaseSearchText = searchText.toLocaleLowerCase();
        // Filter on Pokemon name, number or any of their types
        return pokemons.filter(pkmn =>
            pkmn.name.toLowerCase().includes(lowerCaseSearchText) ||
            pkmn.number.toLocaleLowerCase().includes(lowerCaseSearchText) ||
            pkmn.types.some(t => t.toLocaleLowerCase().includes(lowerCaseSearchText))
        )
    }
    return pokemons
  }

  const filteredPokemons = useMemo(() => filterList(), [ searchText, hasList ])

  return (
    <div className={classes.root}>
      {loading ? <div>Loading...</div> : (
        <>
            {hasList && (
                <input
                    type="search"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder='Search that Pokemon!!!'
                    className={classes.inputStyles}
                />
            )}
            {hasList && filteredPokemons.map((pkmn) => (
                <div key={pkmn.id} className={classes.listItem} onClick={() => handleShowDialog(pkmn.id, pkmn.name)}>
                    <img className={classes.imgStyles} src={pkmn.image} alt=""></img>
                    <div className={classes.contentContainer}>
                        <p className={classes.boldText}>{pkmn.number}</p>
                        <p className={classes.textStyles}>{pkmn.name}</p>
                        <p className={classes.textStyles}>{pkmn.types.map(t => (
                            <span key={`${pkmn.id}-${t}`} className={classes.typeContainer}>{t}</span>
                        ))}</p>
                    </div>
                </div>
            ))}
            {(filteredPokemons.length === 0 && hasList) && (
                <div className={classes.noResults}>Pokedex search yields no results. Be sure to ask Dr.Oak for help.</div>
            )}
        </>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      position: 'relative',
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    listItem: {
        width: '400px',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#7C89A3',
        color: '#000',
        display: 'flex',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'background-color .3s, width .3s',
        '&:hover': {
            backgroundColor: '#9dafd5',
            width: '410px',
        }
    },
    imgStyles: {
        objectFit: 'contain',
        width: '150px',
        height: '150px',
    },
    contentContainer: {
        marginLeft: '10px'
    },
    boldText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    textStyles: {
        color: '#fff'
    },
    typeContainer: {
        padding: '5px',
        borderRadius: '30px',
        backgroundColor: '#7d9cdc',
        marginRight: '5px'
    },
    inputStyles: {
        width: '410px',
        marginBottom: '20px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '10px',
        inset: 'none',
        border: 'none',
        outline: 'none',
        color: '#000',
    },
    noResults: {
        padding: '20px',
        width: '400px',
        backgroundColor: '#7C89A3',
        color: '#fff',
        borderRadius: '10px',
        fontWeight: 'bold'
    },
  },
  { name: 'PokemonList' }
);
