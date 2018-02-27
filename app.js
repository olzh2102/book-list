// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}


// UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
	const bookList = document.getElementById('book-list');

	// Create tr element
	const row = document.createElement('tr');

  // Insert cols
	row.innerHTML =
			`<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="delete-btn">x</a></td>`;

	bookList.appendChild(row);
}

// Delete book
UI.prototype.deleteBook = function(target) {
	if(target.className === 'delete-btn') {
		target.parentElement.parentElement.remove();
	}
}

// Show alert
UI.prototype.setAlert = function(msg, className) {
	// Create div
	const div = document.createElement('div');

	// Add class name
	div.className = `alert ${className}`;

	// Append to div
	div.appendChild(document.createTextNode(msg));

	// Inserting to container
	const container = document.querySelector('.container'),
				form = document.querySelector('#book-form');

	container.insertBefore(div, form);

	// Timeout alert message after 3 seconds
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
}

// Clear fields
UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

// Event listeners
document.getElementById('book-form').addEventListener('submit', function(event) {
	event.preventDefault();

	// Get form values
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value;

	// Instantiate book
	const book  = new Book(title, author, isbn);

	const ui = new UI();

	// Validation
	if(title === '' || author === '' || isbn === '') {
		ui.setAlert('Please fill in all fields', 'error');
	} else {
		// Add book to the list
		ui.addBookToList(book);

		// Show success
		ui.setAlert('Book was added', 'success');

		// Clear fields
		ui.clearFields();
	}
});

// Add event listener to delete book
document.getElementById('book-list').addEventListener('click', function(event) {
	event.preventDefault();

	const ui = new UI();

	ui.deleteBook(event.target);

	// Show message
	ui.setAlert('Book was removed', 'success');

});
