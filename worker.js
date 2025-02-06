// worker.js
self.addEventListener('message', function(e) {
    const { fileId, fileName } = e.data;
    gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
    }).then(function(response) {
        const fileContent = response.body;
        const fileData = parseFileData(fileContent);
        self.postMessage({ fileName, fileData });
    }).catch(error => {
        console.error("Error fetching file data:", error);
    });
});

function parseFileData(fileContent) {
    const lines = fileContent.split('\n');
    const data = {};
    lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
            data[key.trim()] = value.trim();
        }
    });
    return data;
}
