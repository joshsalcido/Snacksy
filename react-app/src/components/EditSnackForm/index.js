import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams} from 'react-router-dom';
import { thunkEditSnack } from '../../store/snacks'
import '../CreateSnackForm/createSnack.css'

export default function EditSnackForm() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { snackId } = useParams()


  const sessionUser = useSelector((state) => state.session.user);
  const snack = useSelector((state) => state.allSnacks[snackId]);

  const [coverPic, setCoverPic] = useState(`${snack.cover_pic}`);
  const [title, setTitle] = useState(`${snack.title}`);
  const [description, setDescription] = useState(`${snack.description}`);
  const [price, setPrice] = useState(`${snack.price}`);
  const [category, setCategory] = useState(`${snack.category}`);
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

    const payload = {
      ...snack,
      user_id: sessionUser.id,
      cover_pic: coverPic,
      title,
      description,
      price,
      category,
    };

    const editedSnack = await dispatch(thunkEditSnack(payload))

    if(editedSnack){
      reset();
      history.push(`/snacks/${snack.id}`)
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
          <h1 className='snackFormTitle'> Edit your snack </h1>
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
              className='form-input'
              value={coverPic}
              onChange={(e) => setCoverPic(e.target.value)}
              required
            />
            <label>Title:</label>
            <input
              type="text"
              className='form-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Description:</label>
            <textarea

              className='form-input'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label>Price:</label>
            <span className='currency-code'>$</span>
            <input
              type="text"
              className='form-input'
              value={price}
              placeholder="22.22"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label>Category: </label>
            <select
              className='form-input'
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
            <button id="snackFormSubmit" type="submit">Edit your Snack</button>
            <NavLink  to={`/snacks/${snackId}`}>
              <button>Cancel</button>
            </NavLink>
          </form>
        </section>

      </>
    )

}
