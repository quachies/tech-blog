document.querySelector('#edit-btn').addEventListener('click', async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);

      const name = document.querySelector('.edit-title').value.trim();
      const description = document.querySelector('.edit-body').value.trim();

      if (name && description) {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          console.log('something went wrong');
          alert('Failed to update post');
        }
      }
    }
  });