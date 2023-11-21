import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const movieSchema = new Schema(
  {
    country: {
      required: [true, 'Поле "country" должно быть заполнено.'],
      type: String,
    },
    director: {
      required: [true, 'Поле "director" должно быть заполнено.'],
      type: String,
    },
    duration: {
      required: [true, 'Поле "duration" должно быть заполнено.'],
      type: Number,
    },
    year: {
      required: [true, 'Поле "year" должно быть заполнено.'],
      type: Number,
    },
    description: {
      required: [true, 'Поле "description" должно быть заполнено.'],
      type: String,
    },
    image: {
      required: [true, 'Поле "image" должно быть заполнено.'],
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL поля "image".',
      },
    },
    trailerLink: {
      required: [true, 'Поле "trailerLink" должно быть заполнено.'],
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL поля "trailerLink".',
      },
    },
    thumbnail: {
      required: [true, 'Поле "thumbnail" должно быть заполнено.'],
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL поля "thumbnail".',
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      required: [true, 'Поле  "movieId" должно быть заполнено.'],
      type: Number,
    },
    nameRU: {
      required: [true, 'Поле "nameRU" должно быть заполнено.'],
      type: String,
    },
    nameEU: {
      required: [true, 'Поле "nameEU" должно быть заполнено.'],
      type: String,
    },
  },
  { versionKey: false, timestamps: false },
);

export default model('movie', movieSchema);
