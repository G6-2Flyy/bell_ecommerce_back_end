const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      model: Product
    }]
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    attributes: ['id', 'category_name'],
    include:[{
        model: Product, 
    }]
  })
    .then((dbData) => {
    if(!dbData){
        return res.status(400).json({
            message: 'Invalid id, no category found!'
        })
    }
      res.json(dbData);
    })
    .catch((error) => {
        console.log(error)
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
        .then((dbData) => {
          res.json(dbData);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then((dbData) => {
    if(!dbData){
      return res.status(400).json({
          message: 'Invalid id, no category found!'
      })
  }
    res.json(dbData);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id,
    }
}).then((dbData)=> {
    if(!dbData){
        return res.status(400).json({
            message: 'Invalid id, no category found!'
        })
    }
    res.json(dbData);
}) .catch((error) => {
    res.status(500).json(error);
  });
});

module.exports = router;
