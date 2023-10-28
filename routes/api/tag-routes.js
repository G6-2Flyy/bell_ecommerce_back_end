const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const dbData = await Tag.findAll({
      include: [{model: Product,
      through: ProductTag}]
    })
    res.status(200).json(dbData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
  const dbData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product,
    through: ProductTag}],
  });

  if (!dbData) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }

  res.status(200).json(dbData);
} catch (err) {
  res.status(500).json(err);
}

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const dbData = await Tag.create(
      req.body
    );
    res.status(200).json(dbData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const dbData = await Tag.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!dbData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(dbData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const dbData = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!dbData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json({ message: 'A tag was successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
