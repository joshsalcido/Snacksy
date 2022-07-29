import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { thunkGetCategory } from '../../store/snacks'

import './categories.css'

function CategoriesPage() {
  const dispatch = useDispatch()
  const { category } = useParams()

  const snacks = useSelector(state => Object.values(state.allSnacks));

  useEffect(() => {
    dispatch(thunkGetCategory(category))
  },dispatch, category)

  return (
    <div>
        {snacks && snacks.map(snack => (
            <div key={snack.id}>
                <Link className="category-snack"to={`/snacks/${snack.id}`}>
                  <div className='category-snack-card'>
                    <img id="category-snack-img" src={snack.cover_pic} alt="snackImg"></img>
                    <p>{snack.title}</p>
                    <p >$ {snack.price.toFixed(2)}</p>
                    <p>{snack.description}</p>
                  </div>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default CategoriesPage
