import {
  createRequestService,
  getRequestsService,
  assignRequestService,
  updateStatusService
} from "./request.service.js";

export const createRequest = async (req, res, next) => {
  try {
    const request = await createRequestService(req.body, req.user);
    res.status(201).json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

export const getRequests = async (req, res, next) => {
  try {
    const requests = await getRequestsService(req.user);
    res.json({ success: true, data: requests });
  } catch (err) {
    next(err);
  }
};

export const assignRequest = async (req, res, next) => {
  try {
    const request = await assignRequestService(req.params.id, req.user);
    res.json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status, duration } = req.body;
    const request = await updateStatusService(req.params.id, status, duration);
    res.json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};
    