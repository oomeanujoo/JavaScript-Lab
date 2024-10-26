document.addEventListener('DOMContentLoaded', () => {
    // Determine API base URL based on the environment
    const hostname = window.location.hostname;
      // Set the hostname in the HTML element
      document.getElementById('hostname').textContent = hostname;

    let apiBaseUrl;

    if (hostname === 'localhost') {
        // Local environment
        apiBaseUrl = 'http://localhost:3000/api';
    } else if (hostname === 'javascript-lab-uj2s.onrender.com') {
        // Development environment
        apiBaseUrl = 'https://javascript-lab-uj2s.onrender.com/api';
    } else if (hostname === 'javascript-lab.onrender.com') {
        // Production environment
        apiBaseUrl = 'https://javascript-lab.onrender.com/api';
    } else {
        // Fallback or error handling
        console.error('Unknown environment, using default API URL.');
        apiBaseUrl = 'http://localhost:3000/api'; // Or any default URL you want to set
    }

    // Log the API base URL for debugging
    console.log('API Base URL:', apiBaseUrl);

    // Function to load users
    const loadUsers = async () => {
        console.log('Loading Users...'); // Log the loading message

        try {
            // Making the fetch request using the dynamically set API URL
            const response = await fetch(`${apiBaseUrl}/users`);
            console.log('Response from API:', response); // Check the response status

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parsing the response as JSON
            const users = await response.json();
            console.log('Users fetched:', users); // Log users data to console

            // Get the table body element
            const tableBody = document.querySelector('#user-table tbody');
            tableBody.innerHTML = ''; // Clear previous rows

            // Populate the table with user data
            users.forEach(user => {
                const row = document.createElement('tr');

                // Create table cells for each user property
                // const idCell = document.createElement('td');
                // idCell.textContent = user.id;
                // row.appendChild(idCell);

                const usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                row.appendChild(usernameCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = user.email;
                row.appendChild(emailCell);

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error); // Catch and log errors
        }
    };

    // Load users on page load
    loadUsers();
});
