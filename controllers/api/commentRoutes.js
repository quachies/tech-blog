const router = require('express').Router();
const { Comment, User } = require('../../models');

  

router.get('/', async (req, res) => {
  try {
    const posts = await Comment.findAll({include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        project_id: req.body.project_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });


module.exports = router;