import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Book } from './book.model';
import { BookService } from './book.service';

@Injectable({ providedIn: 'root' })
export class BooksResolverService implements Resolve<Book[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private bookService: BookService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const books = this.bookService.getBooks();
    const books = this.bookService.loadBooks();
    return books;
    // if (books.length === 0) {
    //   return this.bookService.loadBooks();
    // } else {
    //   return books;
    // }
  }
}
