import Joi from 'joi';
import * as Yup from 'yup';

export const tellUsMorePlayer = Yup.object()
  .shape({
    name: yup.string().required(),
  })
  .required();
