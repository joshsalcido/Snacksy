import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { thunkGetSearchedSnacks } from '../../store/snacks'
import "./SearchedSnacks.css"

export default function SearchedSnacks() {
  const dispatch = useDispatch()
  const { searchWord } = useParams()

  const snacks = useSelector(state => Object.values(state.allSnacks));

  useEffect(() => {
    dispatch(thunkGetSearchedSnacks(searchWord))
  },[dispatch, searchWord])

  return (
    <div>
      {snacks.length === 0 ? (
        <h2> Sorry no snacks found for "{searchWord}"</h2>

      ) :
        <h2>{snacks.length} result(s) for "{searchWord}"</h2>
      }
      <div>
        {snacks && snacks.map(snack => (
            <div key={snack.id}>
                <Link className='search-snacks'to={`/snacks/${snack.id}`}>
                    <img id="snack-image"src={snack.cover_pic} alt="snackImg"></img>
                    <p>{snack.title}</p>
                    <p id='snack-price'>$ {snack.price.toFixed(2)}</p>
                    <p>{snack.description}</p>
                </Link>
            </div>
        ))}
      </div>
    </div>
  )
}
