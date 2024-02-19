function StorageHandler() {
    // Check if "accounts" exists in localStorage, if not create an empty array
    if (!localStorage.getItem('accounts')) {
        localStorage.setItem('accounts', JSON.stringify([]));
    }

    // Function to check if account exists
    this.accountExists = function (username, email, password) {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        return accounts.some(account => account.username === username && account.email === email && account.password === password);
    }

    // Function to check if email and password already exist
    this.emailPasswordExists = function (email, password) {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        return accounts.some(account => account.email === email && account.password === password);
    }

    // Function to add account
    this.addAccount = function (username, email, password) {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        accounts.push({ username, email, password });
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}

const s = new StorageHandler();

// Check if account exists
if (!s.emailPasswordExists('mableskarren37@gmail.com', 'Ken0307')) {
    // Add the account
    s.addAccount('mableskarren37', 'mableskarren37@gmail.com', 'Ken0307');
}

const signUpBtn = document.querySelector('#signUpBtn');
const signInBtn = document.querySelector('#signInBtn');
const signUpTab = document.querySelector('#signUp-tab');
const signInTab = document.querySelector('#signIn-tab');

signUpBtn.addEventListener('click', function (event) {
    event.preventDefault();
    signUpTab.click();

    // Get the input values
    const username = document.querySelector('#typeUsername').value;
    const email = document.querySelector('#signupEmail').value;
    const password = document.querySelector('#typePassword').value;

    // Check if account exists
    if (s.accountExists(username, email, password)) {
        alert('Account already exists!');
    } else {
        // Add the account
        s.addAccount(username, email, password);

        // Clear the input fields
        document.querySelector('#typeUsername').value = '';
        document.querySelector('#signupEmail').value = '';
        document.querySelector('#typePassword').value = '';

        // Alert the user
        alert('Account created successfully! You can now sign in.');
    }
});

signInBtn.addEventListener('click', function (event) {
    event.preventDefault();
    signInTab.click();

    // Get the input values
    const email = document.querySelector('#typeEmailX-2').value;
    const password = document.querySelector('#typePasswordX-2').value;

    // Check if account exists
    if (s.emailPasswordExists(email, password)) {
        window.location.href = 'profile.html';
    } else {
        alert('Incorrect email or password!');
    }
});