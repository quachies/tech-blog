const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;

    const [rowsUpdated] = await Project.update(
      {
        name, 
        description,  
      },
      {
        where: {
          id: req.params.id, 
        },
      }
    );

   
    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

   
    const updatedProject = await Project.findByPk(req.params.id);

    
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
