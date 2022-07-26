import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom';
import { thunkPostSnack } from '../../store/snacks'

export default function SnackForm() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  const [coverPic, setCoverPic] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    const errors = []
    let testRegex = /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp)$/;
    let imageUrlReg = coverPic;
    if (!testRegex.test(imageUrlReg)) {
      errors.push('Please provide a proper imageUrl (e.g., .jpg, .gif, .png, .bmp)')}
    if (title.length < 3)
      errors.push("Title must be at least 3 characters");
    if (title.length > 100)
      errors.push("Title length cannot exceed 100 characters")
    if (description.length > 500)
      errors.push("Description length cannot exceed 500 characters")
    if (description.length < 5)
      errors.push("Decription length must be at least 5 characters")
    let priceRegex = /^[0-9]+(\.[0-9][0-9])?$/;
    let priceReg = price;
    if(!priceRegex.test(priceReg)) {
      errors.push("Must provide a valid US dollar amount")
    }
    setValidationErrors(errors)
  }, [coverPic, title, description, price])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if(validationErrors.length) return alert("Cannot Submit Snack");

    const snack = {
      user_id: sessionUser.id,
      cover_pic: coverPic,
      title,
      description,
      price,
      category,
    };

    const newSnack = await dispatch(thunkPostSnack(snack))

    if (newSnack) {
      reset();
      history.push("/")
    }
  };

  const reset = () => {
    setCoverPic("");
    setTitle("");
    setDescription("");
    setPrice('')
    setCategory('');
    setHasSubmitted(false);
    setValidationErrors([]);
  }


  return (
      <>
        <section className='snack-form'>
          <h1 className='snackFormTitle'> Create a new snack </h1>
          <form className='createSnackForm' onSubmit={handleSubmit}>
            {hasSubmitted && validationErrors.length > 0 && (
              <div className="errorHandling">
                <div className="errorTitle">
                  Please fix the following errors before submitting:
                </div>
                <ul className='errors'>
                  {validationErrors.map((error) => (
                    <ul key={error} id="error">
                    {error}
                    </ul>
                  ))}
                </ul>
              </div>
            )}
            <label>Image:</label>
            <input
              type="text"
              value={coverPic}
              onChange={(e) => setCoverPic(e.target.value)}
              required
            />
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label>Price:</label>
            <span className='currency-code'>$</span>
            <input
              type="text"
              value={price}
              placeholder="22.22"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label>Category: </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option disabled={true}>--select one--</option>
              <option>Chips</option>
              <option>Candy</option>
              <option>Baked Goods</option>
              <option>Protein</option>
              <option>Beverages</option>
            </select>
            <button id="snackFormSubmit" type="submit">Create New Snack</button>
            <NavLink to={'/'}>
              <button>Cancel</button>
            </NavLink>
          </form>
        </section>

      </>
    )

}
