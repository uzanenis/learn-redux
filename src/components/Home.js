import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchCharacters} from "../redux/charactersSlice";
import Masonry from '@mui/lab/Masonry';

const Home = () => {
    const characters = useSelector(state => state.characters.items)
    const isLoading = useSelector(state => state.characters.isLoading)
    const error = useSelector(state => state.characters.error)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCharacters())
    }, [dispatch])

    console.log(characters)

    if(isLoading){
        return <div>Loading...</div>

    }

    if(error){
        return <div>{error}</div>
    }
    return (
        <Masonry columns={3} spacing={2}>
            {characters.map((character) => (
                <div key={character.char_id} >
                    <img src={character.img} alt={character.name} style={{width:300, height:'auto' }}></img>
                    <h3>{character.name}</h3>
                </div>

            ))}
        </Masonry>
    )
}

export default Home