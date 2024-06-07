import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookChanged = new Subject<Book[]>();
  private books: Book[] = [];

  constructor(private http: HttpClient) {}

  setBooks(books: Book[]) {
    if (!books) {
      books = [];
    }
    this.books = books;
    this.bookChanged.next(this.books.slice());
  }

  getBooks(): Book[] {
    return this.books.slice();
  }

  getBook(index: number): Book {
    return this.books[index];
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.apiBaseUrl}${localStorage.getItem("customerId")}/books`, book)
    .pipe(
      tap(resData => {
        this.books.push(resData);
        this.bookChanged.next(this.books.slice());
      })
    );
  }

  updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.bookChanged.next(this.books.slice());
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.bookChanged.next(this.books.slice());
  }

  loadBooks(): Observable<Book[]> {
    console.log("FETCHING BOOKS");
    return this.http.get<Book[]>(`${environment.apiBaseUrl}${localStorage.getItem("customerId")}/books`).pipe(
      tap(resData => {
        this.setBooks(resData);
      }),
      catchError(error => {
        console.error('Error fetching books', error);
        return of([]);
      })
    );
  }
}
