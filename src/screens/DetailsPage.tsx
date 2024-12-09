import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList, PokemonDetails } from '../components';

export const DetailsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonList />
      <PokemonDetails />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'DetailsPage' }
);
