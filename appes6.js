class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
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

	deleteBook(target) {
		if(target.className === 'delete-btn') {
			target.parentElement.parentElement.remove();
		}
	}

	setAlert(msg, className) {
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

	clearFields() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}
}

// Local storage class
class Store {
	static getBooks() {
		let books;

		if(localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static displayBooks() {
		const books = Store.getBooks();

		books.forEach(function(book) {
			const ui = new UI;

			// Add book to UI
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();

		books.push(book);

		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach(function(book, index) {
			if(book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));

	}
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listeners
document.getElementById('book-form').addEventListener('submit', event => {
	event.preventDefault();

	// Get form values
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value;

	// Instantiate book
	const book  = new Book(title, author, isbn),
				ui = new UI();

	// Validation
	if(title === '' || author === '' || isbn === '') {
		ui.setAlert('Please fill in all fields', 'error');
	} else {
		// Add book to the list
		ui.addBookToList(book);

		// Add to local storage
		Store.addBook(book);

		// Show success
		ui.setAlert('Book was added', 'success');

		// Clear fields
		ui.clearFields();
	}
});

// Add event listener to delete book
document.getElementById('book-list').addEventListener('click', event => {
	event.preventDefault();

	const ui = new UI();

	ui.deleteBook(event.target);

	// Remove from LS
	Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

	// Show message
	ui.setAlert('Book was removed', 'success');

});
