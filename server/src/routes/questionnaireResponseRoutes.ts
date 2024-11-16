import express from "express";
import * as responseValidator from "../validators/questionnaireResponseValidator";
import * as responseController from "../controllers/questionnaireResponseController";

const router = express.Router();

router.get("/", responseController.getAllResponses);
router.post(
  "/",
  responseValidator.createResponseValidator,
  responseController.createResponse
);

router.get("/:id", responseController.getResponseById);
router.patch(
  "/:id",
  responseValidator.updateResponseValidator,
  responseController.updateResponse
);
router.delete("/:id", responseController.deleteResponse);

router.get("/user/:userId", responseController.getResponsesByUserId);

export default router;
