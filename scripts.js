document.addEventListener("DOMContentLoaded", function() {
    function createBarGraph(containerId, data, labels) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content
        const maxHeight = 300; // Maximum height of bars in pixels
        const barWidth = 50; // Width of each bar in pixels
        const spacing = 20; // Space between bars in pixels

        data.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / Math.max(...data)) * maxHeight}px`;
            bar.style.width = `${barWidth}px`;
            bar.style.marginRight = `${spacing}px`; // Space between bars
            bar.innerHTML = `<span class="value-label">${value} kWh</span>`;
            container.appendChild(bar);

            // Add labels below bars
            const xLabel = document.createElement('div');
            xLabel.className = 'x-label';
            xLabel.textContent = labels[index];
            document.getElementById(containerId + '-labels').appendChild(xLabel);
        });
    }

    // Weekly Data
createBarGraph('weekly-graph', [120, 150, 170, 200, 180], ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']);
    // Monthly Data
createBarGraph('monthly-graph', [500, 600, 700, 800, 750], ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5']);
    // Yearly Data
createBarGraph('yearly-graph', [2000, 2200, 2500, 2700, 2600], ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']);
});

// Check if geolocation is available and get the position
function getLocation() {
    const status = document.getElementById('location-status');

    if (navigator.geolocation) {
        status.textContent = "Getting your location...";
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        status.textContent = "Geolocation is not supported by this browser.";
    }
}

// Display the coordinates
function showPosition(position) {
    document.getElementById('latitude').textContent = position.coords.latitude;
    document.getElementById('longitude').textContent = position.coords.longitude;

    // Optionally, show location on a map
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    initMap(lat, lon);
}

// Error handling for geolocation
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location-status').textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location-status').textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('location-status').textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location-status').textContent = "An unknown error occurred.";
            break;
    }
}

// Initialize Google Map (optional)
function initMap(lat, lon) {
    const mapOptions = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

