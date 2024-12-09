import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type Dimensions = {
    minimum: string,
    maximum: string
}

export type Pokemon = {
    id: string,
    number: string,
    name: string,
    weight: Dimensions,
    height: Dimensions,
    classification: string,
    types: string[],
    resistant: string[],
    weaknesses: string[],
    fleeRate: number,
    maxCP: number,
    maxHP: number,
    image: string
};

export const GET_POKEMON = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemon = (id: Pokemon['id'], name: Pokemon['name']) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: { id, name },
    // Prevent query if params are not provided
    skip: !id || !name
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || {}, [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
