import Joi from "joi";

export const createReservationSchema = Joi.object({
  parkingSlotId: Joi.string().uuid().required(),
  vehiclePlate: Joi.string().min(3).max(20).required(),
  date: Joi.string().required(), // YYYY-MM-DD
  startHour: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // HH:mm
  durationHours: Joi.number().integer().min(1).max(12).required(),
});

export const cancelReservationSchema = Joi.object({
  id: Joi.string().uuid().required(),
});


