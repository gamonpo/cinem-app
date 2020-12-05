import React from 'react';

import { Feather } from '@expo/vector-icons';
import { useMovie } from '../../context/Movie';

import Header from '../../components/Header';

import {
    List,
    Ball,
    Card,
    Line,
    Column,
    Data,
    Icon,
} from '../../components/Card/styles';

import colors from '../../styles/colors';

import { Container } from './styles';

export default function Favoritos() {
    const { favorites, setFavorites } = useMovie();

    function removeFavoriteMovie(item) {
        const favoritesMovies = favorites.map((m) => {
            return m.imdbID === item.imdbID ? { ...m, favorite: false } : m;
        });

        setFavorites(favoritesMovies);
    }

    const renderItem = ({ item }) => {
        if (item.favorite)
            return (
                <Card>
                    <Column>
                        <Line>
                            <Ball />
                            <Data>{item.Title}</Data>
                        </Line>
                        <Line style={{ justifyContent: 'space-between' }}>
                            <Data style={{ left: 25 }}>Ano:{item.Year}</Data>
                            <Icon
                                style={{ bottom: 13 }}
                                onPress={() => removeFavoriteMovie(item)}
                            >
                                <Feather
                                    name="star"
                                    size={24}
                                    color={colors.comp_icon_active}
                                />
                            </Icon>
                        </Line>
                    </Column>
                </Card>
            );
    };

    return (
        <Container>
            <Header />

            <List
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.imdbID}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            />
        </Container>
    );
}
