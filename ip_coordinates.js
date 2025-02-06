const ipCoordinates = {
    "10.14.6.24": [363, 87, [26, 30]],//
    "10.14.6.23": [402, 87, [26, 30]],//
    "10.14.6.26": [440, 87, [26, 30]],//
    "10.14.6.37": [480, 87, [26, 30]],//
    "10.14.6.18": [472, 18, [26, 30]],//
    "10.14.6.19": [511, 18, [26, 30]],//
    "10.14.6.22": [550, 18, [26, 30]],//
    "10.14.6.42": [833, 156, [26, 30]],//
    "10.14.6.44": [795, 156, [26, 30]],//
    "10.14.6.43": [840, 218, [26, 30]]//
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
            imageContainer.appendChild(icon);
        }
    });
}

document.querySelector('.image-container').addEventListener('mousemove', function(event) {
    const tooltip = document.getElementById('tooltip');
    const icon = event.target.closest('.icon');
    if (icon) {
        tooltip.innerHTML = `IP: ${icon.dataset.ip}<br>Status: ${icon.dataset.status}`;
        const iconRect = icon.getBoundingClientRect();
        tooltip.style.left = `${iconRect.left + (iconRect.width / 2) - (tooltip.offsetWidth / 2) + window.scrollX}px`;
        tooltip.style.top = `${iconRect.bottom + window.scrollY + 2}px`; // Display closer below the icon
        tooltip.style.display = 'block';
        tooltip.style.color = 'white'; // Ensure text color is white
    } else {
        tooltip.style.display = 'none';
    }
});

document.querySelector('.image-container').addEventListener('mouseleave', function() {
    document.getElementById('tooltip').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', addIconsToImage);
window.addEventListener('resize', addIconsToImage); // Recalculate icon positions on window resize
