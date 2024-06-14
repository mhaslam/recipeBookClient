import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './book.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookChanged = new Subject<Book[]>();
  private books: Book[] = [];

  // Sidebar state management
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  constructor(private http: HttpClient) {}

  // Sidebar state methods
  openSidebar() {
    this.sidebarState.next(true);
  }

  closeSidebar() {
    this.sidebarState.next(false);
  }

  // Book management methods
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
    console.log(JSON.stringify(this.books));
    return this.books[index];
  }

  getBookById(id: string): Book | undefined {
    return this.books.find(book => book.id == id);
  }
  
  addBook(book: Book): Observable<Book | any> {
    return this.http.post<Book>(`${environment.apiBaseUrl}${localStorage.getItem("customerId")}/books`, book)
    .pipe(
      tap(resData => {
        this.books.push(resData);
        this.bookChanged.next(this.books.slice());
        this.closeSidebar(); // Close sidebar after adding a book
      }),
      catchError(error => {
        console.error('Error creating book '+book.title, error);
        return of([]);
      })
    );
  }

  updateBook(id: string, updatedBook: Book):Observable<Book | any> {
    return this.http.put<Book>(`${environment.apiBaseUrl}${localStorage.getItem("customerId")}/books/`+id, updatedBook)
    .pipe(
      tap(resData => {
        const index = this.books.findIndex(book => book.id == id);
        console.log("updating book "+index  );

        this.books[index]=resData;
        console.log("updating book "+this.books[index].title);

        this.bookChanged.next(this.books.slice());
        this.closeSidebar(); // Close sidebar after adding a book
      }),
      catchError(error => {
        console.error('Error updating book '+id, error);
        return of([]);
      })
    );
  }

  deleteBook(id: string) {
    return this.http.delete<any>(`${environment.apiBaseUrl}${localStorage.getItem("customerId")}/books/`+id)
    .pipe(
      tap(() => {
        console.log("Here 1");
        const index = this.books.findIndex(book => book.id == id);
        console.log("Here 2");
        if (index !== -1) {
            this.books.splice(index, 1);
        }
        console.log("Here 3");
        this.bookChanged.next(this.books.slice());
        this.closeSidebar(); // Close sidebar after adding a book
      }),
      catchError(error => {
        console.error('Error deleting book '+id, error);
        return of([]);
      })
    )
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

  getRecipes(bookId: string, page: number = 0, size: number = 5, sort: string = 'title,desc'): Observable<any> {
    let params = new HttpParams()
      .set('bookId', bookId)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<any>(`${environment.apiBaseUrl}${localStorage.getItem("customerId")}/recipes`, { params });
  }
}
