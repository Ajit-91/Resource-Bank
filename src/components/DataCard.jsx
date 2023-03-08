import React, { useState } from 'react'
import { Box, Button, Checkbox, IconButton, Paper, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { setCurrentCard } from '../redux/slices/cardSlice';
import MediaPlayer from './MediaPlayer';
import { addHistory } from '../APIs/historyApi';

const DataCard = ({cardInfo, setEdit}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const handleEdit = () => {
        setEdit(true)
        dispatch(setCurrentCard(cardInfo))
    }

    const handleOpen = async () => {
        setOpen(true)
        // add to history using addHistory
        try {
            const data = await addHistory({
                cardName : cardInfo?.name,
                link : cardInfo?.link,
                time : Date.now()
            })
            console.log({historyDataCreated : data})
        } catch (error) {
            console.log({historyDataError : error})
        }
    }
  return (
    <>
    <Paper elevation={3}>
        {open && (
            <MediaPlayer open={open} setOpen={setOpen} link={cardInfo?.link} />
        )}
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }} >
            <Checkbox />
            <IconButton onClick={handleEdit} >
                <EditIcon />
            </IconButton>
        </Box>

        <Box sx={{display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'column', py : 4}}>
            <Typography align='center' variant="h5">{cardInfo?.name?.toUpperCase()}</Typography>
            <Button mt={3} onClick={handleOpen} >Open</Button>
        </Box>
    </Paper>
</>
  )
}

export default DataCard