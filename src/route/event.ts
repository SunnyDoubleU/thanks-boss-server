import * as express from "express";
import { Request, Response } from "express";
import Event, { IEvent } from "../model/event";
import { createEvent, getAllEvents, getOneEvent } from "../controller/event";

const router = express.Router();

router.post("/createEvent", (req: Request, res: Response) => {
  createEvent(req, res);
});

router.get("/getAllEvents", (req: Request, res: Response) => {
  getAllEvents(req, res);
  //   Event.find()
  //     .then((events) => {
  //       res.send(events);
  //     })
  //     .catch((error) => {
  //       res.status(400).send(error);
  //     });
});

router.get("/getOneEvent/:eventId", (req: Request, res: Response) => {
  getOneEvent(req, res);
});

module.exports = router;
