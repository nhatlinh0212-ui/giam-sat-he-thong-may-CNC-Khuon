const ipCoordinates = {
    "10.14.6.24": [363, 87, [27, 31]],//
    "10.14.6.23": [402, 87, [27, 31]],//
    "10.14.6.26": [440, 87, [27, 31]],//
    "10.14.6.37": [480, 87, [27, 31]],//
    "10.14.6.18": [472, 17, [27, 31]],//
    "10.14.6.19": [511, 17, [27, 31]],//
    "10.14.6.22": [550, 17, [27, 31]],//
    "10.14.6.42": [833, 156, [27, 31]],//
    "10.14.6.44": [795, 156, [27, 31]],//
    "10.14.6.43": [840, 218, [27, 31]]//
};

function addIconsToImage() {
    const imageContainer = document.querySelector('.image-container');
    const image = imageContainer.querySelector('img');
    const imageRect = image.getBoundingClientRect();
    const originalWidth = 1000; // Original width of the image
    const originalHeight = 500; // Original height of the image
    const scaleX = imageRect.width / originalWidth;
    const scaleY = imageRect.height / originalHeight;

    imageContainer.querySelectorAll('.icon').forEach(icon => icon.remove());

    Array.from(document.getElementById('file-list').children).forEach(row => {
        const ip = row.querySelector('.file-name').innerText;
        const status = row.querySelector('.status').innerText;
        if (ipCoordinates[ip]) {
            const [x, y, [width, height]] = ipCoordinates[ip];
            const icon = document.createElement('img');
            icon.src = status.includes("🟢") ? 'on.png' : status.includes("🟡") ? 'off.png' : 'alert.png';
            icon.className = 'icon';
            icon.style = `position:absolute;left:${x * scaleX}px;top:${y * scaleY}px;width:${width * scaleX}px;height:${height * scaleY}px;`;
            icon.dataset.ip = ip; // Store the IP address in a data attribute
            icon.dataset.status = status; // Store the status in a data attribute
            icon.addEventListener('mouseover', showNote);
            icon.addEventListener('click', showNote);
            imageContainer.appendChild(icon);
        }
    });
}

function showNote(event) {
    const existingNote = document.querySelector('.note');
    if (existingNote) {
        existingNote.remove();
    }

    const note = document.createElement('div');
    note.className = 'note';
    note.innerText = `IP: ${event.target.dataset.ip}\nStatus: ${event.target.dataset.status}`;
    note.style.position = 'absolute';
    note.style.left = `${event.target.getBoundingClientRect().left}px`;
    note.style.top = `${event.target.getBoundingClientRect().bottom + 5}px`; // Place note 2px below the icon
    note.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    note.style.color = 'white';
    note.style.padding = '5px';
    note.style.borderRadius = '5px';
    note.style.zIndex = '1000';
    document.body.appendChild(note);

    setTimeout(() => {
        note.remove();
    }, 5000); // Remove note after 5 seconds

    event.target.addEventListener('mouseleave', () => {
        note.remove();
    }, { once: true });
}

document.querySelector('.image-container').addEventListener('mouseleave', function() {
    document.getElementById('tooltip').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', addIconsToImage);
window.addEventListener('resize', addIconsToImage); // Recalculate icon positions on window resize
