import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Bucket from '../../components/Bucket'
import Loading from '../../components/Loading'
import { getAllBuckets, selectBuckets } from '../../redux/slices/bucketSlice'
import CreateBucket from './CreateBucket'

const Buckets = () => {
  const info = useSelector(selectBuckets)
  const [bucketsData, setBucketsData] = useState(info)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const [refetch, setRefetch] = useState(true)
  const [edit, setEdit] = useState(false)

  console.log({ info })

  useEffect(() => {
    (async () => {
      // if data is already in redux store, then no need to fetch again
      // if(info && !refetch){
      //   setBucketsData(info)
      //   setLoading(false)
      //   return
      // }
      try {
        const data = await dispatch(getAllBuckets()).unwrap();
        console.log({ data })
        setBucketsData(data)
        setLoading(false)
      } catch (error) {
        console.log({bucketsError: error})
          alert(error || 'Something went wrong')
      }

    })()
  }, [dispatch, refetch])

  return (
    <>
      {loading ? <Loading /> : (
        <>
          {(openModal || edit) && <CreateBucket edit={edit} open={openModal} setOpen={setOpenModal} setRefetch={setRefetch}/>}
          <Typography align='center' variant='h5'>Buckets</Typography>
          <Button variant='contained' sx={{my : 3}} onClick={()=>setOpenModal(true)}>Create Bucket</Button>
          <Grid container spacing={2}>
            {
              bucketsData && bucketsData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                  <Bucket name={item.name} id={item.id} setEdit={setEdit} />
                </Grid>
              ))
            }
          </Grid>

        </>
      )}
    </>
  )
}

export default Buckets