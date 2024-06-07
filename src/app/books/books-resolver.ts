// import { inject } from '@angular/core';
// import { ResolveFn } from '@angular/router';
// import { Book } from './book.model';
// import { BookService } from './book.service';
// import { Observable, of } from 'rxjs';
// import { map, tap } from 'rxjs/operators';

// export const bookResolver: ResolveFn<Book[]> = (route, state) => {
//   const bookService = inject(BookService);

//   const books = bookService.getBooks();
//   console.log("BOOK RESOLVER INITIATED");
//   console.log("Current books in service:", books);

//   if (books.length === 0) {
//     console.log("BOOK RESOLVER FETCHING BOOKS");
//     return bookService.loadBooks().pipe(
//       tap(fetchedBooks => {
//         console.log("Books fetched from API:", fetchedBooks);
//         bookService.setBooks(fetchedBooks);
//       }),
//       map(fetchedBooks => fetchedBooks)
//     );
//   } else {
//     console.log("BOOK RESOLVER FOUND BOOKS IN SERVICE");
//     return of(books);
//   }
// };
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of, take } from 'rxjs';

export const bookResolver: ResolveFn<any> = (route, state) => {
  console.log("BOOK RESOLVER INITIATED");
  return of(['sample book data']).pipe(take(1));
};

