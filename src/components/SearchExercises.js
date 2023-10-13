import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Stack, TextField } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {

    const [search, setSearch] = useState('')
    const [bodyParts, setBodyParts] = useState([])

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
            setBodyParts(['all', ...bodyPartsData])
        }
        fetchExercisesData()
    }, [])

    const handleSearch = async () => {
        if (search) {
            const exerciseData = await fetchData
                ('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)

            const searchedExercises = exerciseData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                    || exercise.target.toLowerCase().includes(search)
                    || exercise.equipment.toLowerCase().includes(search)
                    || exercise.bodyPart.toLowerCase().includes(search)
            )
            setSearch('')
            setExercises(searchedExercises)
            // console.log(exerciseData[0].bodyPart)
        }

    }

    return (
        <Stack
            alignItems='center'
            mt='37px'
            justifyContent='center'
            p='20px'
        >
            <Typography
                fontWeight={700}
                mb='50px'
                textAlign='center'
                sx={{
                    fontSize: { lg: '44px', xs: '30px' }
                }}
            > Awesome exercises you <br /> should know

            </Typography>
            <Box
                position='relative'
                mb='72px'
            >
                <TextField
                    height='76px'
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    placeholder='Search exercises'
                    type='text'
                    sx={{
                        input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
                        width: { lg: '800px', xs: '350px' },
                        backgroundColor: '#fff',
                        borderRadius: '40px'
                    }}
                />
                <Button
                    className='search-btn'
                    sx={{
                        bgcolor: '#ff2625',
                        color: '#fff',
                        textTransform: 'none',
                        height: '56px',
                        position: 'absolute',
                        width: { lg: '175px', xs: '80px' },
                        fontSize: { lg: '20px', xs: '14px' }
                    }}
                    onClick={handleSearch}
                >
                    Search
                </Button>

            </Box>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    p: '20px'
                }}>
                <HorizontalScrollbar
                    data={bodyParts}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart} 

                    />

            </Box>
        </Stack>
    )
}

export default SearchExercises