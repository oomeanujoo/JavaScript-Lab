// Function to load users automatically on page load
const loadUsers = async () => {
    console.log('Fetching users on page load'); // Check if function is called

    try {
        // Making the fetch request
        const response = await fetch('https://javascript-lab.onrender.com/api/users'); 
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

            // // Create table cells for each user property
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

// Automatically load users when the page is fully loaded
window.addEventListener('load', loadUsers);
