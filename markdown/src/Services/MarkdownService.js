import toastr from 'toastr';

const backendUrl = 'http://localhost:4000';

// TODO: Use toastr later
const onError = (err, message) => {
    console.error(message, err);
    toastr.error(message);
};

const listMarkdowns = (onSuccess) => {
    fetch(`${backendUrl}/api/markdown/`)
        .then(response => response.json())
        .then(data => {
          toastr.success('Got all markdowns from server');
          onSuccess(data);
        })
        .catch((error) => {
          onError(error, 'Failed to fetch Markdown list:');
        });
};

const getMarkdownById = (id, onSuccess) => {
    fetch(`${backendUrl}/api/markdown/${id}`)
        .then(response => response.json())
        .then(data => {
            onSuccess(data);
            toastr.success('Got markdown by id from server');
        })
        .catch((error) => {
            onError(error, 'Failed to fetch Markdown list:');
        });
};

// Create a new markdown
const createMarkdown = (content, onSuccess) => {    
    fetch(`${backendUrl}/api/markdown/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content }),
    })
    .then(response => response.json())
    .then(data => {
        onSuccess(data);
        toastr.success('Created markdown successfully');
    })
    .catch((error) => {
        console.error('Failed to update Markdown:', error);
    });
};

// Update an existing markdown
const updateMarkdown = (id, content, onSuccess) => {    
    fetch(`${backendUrl}/api/markdown/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content }),
    })
    .then(response => response.json())
    .then(data => {
        onSuccess(data);
        toastr.success('Markdown updated successfully');
    })
    .catch((error) => {
        console.error('Failed to update Markdown:', error);
    });
};

// Delete a markdown
const deleteMarkdown = (id, onSuccess) => {
    fetch(`${backendUrl}/api/markdown/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        onSuccess(data);
        toastr.success('Markdown deleted successfully');
    })
    .catch(error => {
        onError(error, 'Failed to delete Markdown:');
    });
};

export { 
    listMarkdowns, 
    createMarkdown, 
    updateMarkdown, 
    deleteMarkdown, 
    getMarkdownById
}