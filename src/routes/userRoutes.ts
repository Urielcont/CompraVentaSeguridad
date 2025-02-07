import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Usuarios funcionando" });
});

export default router;
