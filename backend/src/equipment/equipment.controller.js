import {
  createEquipmentService,
  getAllEquipmentService,
  getEquipmentByIdService,
  scrapEquipmentService
} from "./equipment.service.js";

export const createEquipment = async (req, res, next) => {
  try {
    const equipment = await createEquipmentService(req.body);
    res.status(201).json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
};

export const getAllEquipment = async (req, res, next) => {
  try {
    const equipment = await getAllEquipmentService();
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
};

export const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await getEquipmentByIdService(req.params.id);
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
};

export const scrapEquipment = async (req, res, next) => {
  try {
    const equipment = await scrapEquipmentService(req.params.id);
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
};
