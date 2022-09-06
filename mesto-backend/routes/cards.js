const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regularExpression } = require('../errors/regularExpression');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// создаёт карточку
cardRouter.post('/api/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regularExpression),
  }),
}), createCard);

// возвращает все карточки
cardRouter.get('/api/cards', getCards);

// удаляет карточку по идентификатору
cardRouter.delete('/api/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);

// поставить лайк карточке
cardRouter.put('/api/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);

// убрать лайк с карточки
cardRouter.delete('/api/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);

module.exports = cardRouter;
