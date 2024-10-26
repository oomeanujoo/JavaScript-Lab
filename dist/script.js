// Determine API base URL based on the environment
const isProduction = window.location.hostname === 'javascript-lab.onrender.com';
const apiBaseUrl = isProduction ? 'https://javascript-lab.onrender.com/api' : 'http://localhost:3000/api';

// Function to load users
document.getElementById('load-users-btn').addEventListener('click', async () => {
    console.log('Load Users button clicked'); // Check if button click is working

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
            const idCell = document.createElement('td');
            idCell.textContent = user.id;
            row.appendChild(idCell);

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
});
