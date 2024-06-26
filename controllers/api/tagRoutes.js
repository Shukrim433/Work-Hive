const router = require("express").Router();
const { Tag, Role } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// /api/tags
router.get("/", async (req, res) => {
  
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Role }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Role data
router.get("/:id", async (req, res) => {
 
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Role }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag has been found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
// /api/tags
router.post("/", async (req, res) => {

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
// /api/tags/:id
router.put("/:id", async (req, res) => {

  try {
    const tagData = await Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData) {
      res
        .status(200)
        .json(tagData, { message: "No tag has been found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
// /api/tags/:id
router.delete("/:id", async (req, res) => {
  
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag has been found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
