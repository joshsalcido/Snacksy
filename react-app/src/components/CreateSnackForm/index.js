import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkPostSnack } from '../../store/snacks'

export default function SnackForm() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  const [coverPic, setCoverPic] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    const errors = []
    let testRegex = /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp)$/;
    let imageUrlReg = coverPic;
    if (!testRegex.test(imageUrlReg)) {
      errors.push('Must provide a proper imageUrl (e.g., .jpg, .gif, .png, .bmp)')}
    if (title.length < 3)
      errors.push("Must be at least 3 characters");
    if (title.length > 100)
      errors.push("Title length cannot exceed 100 characters")
    if (description.length > 500)
      errors.push("Description length cannot exceed 500 characters")
    if (description.length < 5)
      errors.push("Decription length must exceed 5 characters")
    let priceRegex = /^[0-9]+(\.[0-9][0-9])?$/;
    let priceReg = price;
    if(!priceRegex.test(priceReg)) {
      errors.push("Must provide a valid US dollar amount")
    }
    setValidationErrors(errors)
  }, [coverPic, title, description, price])

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if(validationErrors.length) return alert("Cannot Submit Snack");

    const newSnack = {
      user_id: sessionUser.id,
      coverPic,
      title,
      description,
      price,
      category,
    };

    if (newSnack) {
      dispatch(thunkPostSnack(newSnack));
    }

    setCoverPic("");
    setTitle("");
    setDescription("");
    setPrice(null)
    setCategory('');
    setHasSubmitted(false);
    setValidationErrors([]);
    alert("Snack was posted!")
  };

  return (
      <>
        <form className='createSnackForm'>


        </form>

      </>
    )

}
