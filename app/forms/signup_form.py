from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_matches(form, field):
    password = field.data
    repeat_password.field.data
    if password != repeat_password:
        raise ValidationError('Passwords must match.')


class SignUpForm(FlaskForm):
    profile_picture = StringField("profile_picture")
    first_name = StringField("first_name", validators=[DataRequired()])
    last_name = StringField("last_name", validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    address = StringField("address", validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired(), password_matches])
    repeat_password = StringField('repeat_password', validators=[DataRequired(), password_matches])
