from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Snack
import re



def title_exists(form, field):
    title = field.data
    snack = Snack.query.filter(Snack.title == title).first()
    if snack:
        raise ValidationError('Snack title already exists.')


def pic_regex(form, field):
    cover_pic = field.data
    # test_regex = '^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp)$'
    # test = re.compile(test_regex)
    if (not re.search(r'^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp)$', cover_pic)):
        raise ValidationError('Please provide a proper imageUrl (e.g., .jpg, .gif, .png, .bmp)')


def title_length(form, field):
    title = field.data
    if (len(title) < 3):
        raise ValidationError('Title must be at least 3 characters')

    if (len(title) > 100):
        raise ValidationError('Title length cannot exceed 100 characters')


def description_length(form, field):
    description = field.data
    if (len(description) < 5):
        raise ValidationError('Decription length must be at least 5 characters')

    if (len(description) > 500):
        raise ValidationError('Description length cannot exceed 500 characters')


def price_regex(form, field):
    price = field.data
    # regex = '^[0-9]+(\.[0-9][0-9])?$'
    # test = re.complie(regex)
    if (not re.search(r'^[0-9]+(\.[0-9][0-9])?$', str(price))):
        raise ValidationError('Please provide a valid US dollar amount')

class SnackForm(FlaskForm):
    user_id = IntegerField('user_id')
    cover_pic = StringField('cover_pic', validators=[DataRequired(), pic_regex])
    title = StringField("title", validators=[DataRequired(), title_exists, title_length])
    description = TextAreaField("description", validators=[DataRequired(), description_length])
    price = FloatField("price", validators=[DataRequired(), price_regex])
    category = SelectField("category", choices=['Chips', 'Candy', 'Baked Goods', 'Protein', 'Beverages'],validators=[DataRequired()])

# class SnackForm(FlaskForm):
#     user_id = IntegerField('user_id')
#     cover_pic = StringField('cover_pic', validators=[DataRequired()])
#     title = StringField("title", validators=[DataRequired()])
#     description = TextAreaField("description", validators=[DataRequired()])
#     price = FloatField("price", validators=[DataRequired()])
#     category = SelectField("category", choices=['Chips', 'Candy', 'Baked Goods', 'Protein', 'Beverages'],validators=[DataRequired()])
