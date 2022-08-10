import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const TitleLikesSM = ({ title }) => {
  TitleLikesSM.propTypes = {
    title: PropTypes.any
  }
  const userId = useSelector(state => state.User?.id)
  const { id } = useParams()

  const { Favorites } = useSelector(state => state)
  const [estilo, setEstilo] = useState('text-neutral-400 text-3xl hover:text-red-500')
  const favorito = Favorites.map((e) => e.id).find((e) => e === Number(id))

  const handleClick = () => {
    if (favorito) {
      axios.post('/favorite/delete', { nftId: id, userId })
      return setEstilo('text-neutral-400 text-3xl')
    }
    axios.post('/favorite/add', { nftId: id, userId })
    return setEstilo('text-red-500 text-3xl')
    // axios.post('/favorite/delete', { nftId: id, userId })
  }
  useEffect(() => {
    if (favorito) {
      setEstilo('text-red-500 text-3xl')
    }
  }, [Favorites])

  return (
        <div className='flex xl:hidden w-full justify-center space-x-20 '>
            <h1 className='mt-6 text-xl md:text-3xl tracking-wider text-purple-700 ml-4 capitalize'>{title}</h1>
            <div className='flex items-center mt-6 place-content-end'>
                <FaHeart className={estilo} onClick={handleClick}/>
                {/* <p className='ml-4 text-md self-auto text-neutral-400 tracking-wider'>444 likes</p> */}
            </div>
        </div>
  )
}

export default TitleLikesSM
