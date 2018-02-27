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

	// Add book to the list
	const ui = new UI();

	ui.addBookToList(book);

	ui.clearFields();

});
