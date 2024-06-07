import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  subscription: Subscription;
  isLoading = true;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {

    this.subscription = this.bookService.bookChanged.subscribe((books: Book[]) => {
      this.books = books;
      this.isLoading = false;
    });

    this.bookService.loadBooks().subscribe(books => {
      this.books = books;
      this.isLoading = false;
    });
  }

  onNewBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onNewRecipe() {
    this.router.navigate(['../recipes/new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
