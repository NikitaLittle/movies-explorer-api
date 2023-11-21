import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import Unauthorized from '../errors/Unauthorized.js';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено.'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v, {
          allow_utf8_local_part: true,
        }),
        message: '',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено.'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено.'],
      minlength: [2, 'Минимальная длина поля "name" - 2.'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
  },
  { versionKey: false, timestamps: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password).then((mathed) => {
        if (!mathed) {
          throw new Unauthorized('Неправильные почта или пароль');
        }

        return user;
      });
    });
};

export default model('user', userSchema);
