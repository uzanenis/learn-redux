import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchCharacters} from "../redux/charactersSlice";
import Masonry from '@mui/lab/Masonry';

const Home = () => {
    const characters = useSelector(state => state.characters.items)
    const nextPage = useSelector(state => state.characters.page)
    const isLoading = useSelector(state => state.characters.isLoading)
    const error = useSelector(state => state.characters.error)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCharacters())
    }, [dispatch])


    if (error) {
        return <div>{error}</div>
    }
    return (
        <div style={{padding:32}}>
            <Masonry columns={3} spacing={2}>
                {characters.map((character) => (
                    <div key={character.id}>
                        <img src={character.image} alt={character.name} style={{width: 300, height: 'auto'}}></img>
                        <h3>{character.name}</h3>
                    </div>
                ))}
            </Masonry>
            <div>
                <button onClick={() =>
                    dispatch(fetchCharacters(nextPage))
                }>
                    {isLoading ? <span>Loading...</span> : <span>{nextPage}</span>}Next Page -> ({nextPage})</button>
            </div>

        </div>

    )
}

export default Home