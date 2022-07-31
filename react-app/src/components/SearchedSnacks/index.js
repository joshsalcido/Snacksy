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
    <div className="searched_snacks_container">
      {snacks.length === 0 ? (
        <h2> Sorry no snacks found for "{searchWord}"</h2>

      ) :
        <h2>{snacks.length} result(s) for "{searchWord}"</h2>
      }
      <div className="searched_snacks_container2">
        {snacks && snacks.map(snack => (
            <div className="indv_searched_snack"key={snack.id}>
                <Link className='search-snacks'to={`/snacks/${snack.id}`}>
                    <img id="snack-image"src={snack.cover_pic} alt="snackImg"></img>
                    <p id="snack_search_title">{snack.title}</p>
                    <p id='snack-price'>${snack.price.toFixed(2)}</p>
                </Link>
            </div>
        ))}
      </div>
    </div>
  )
}
