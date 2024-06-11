import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
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
      console.log("Book Changed ");
      console.log(books);
      this.books = books;
      this.isLoading = false;
    });

    this.bookService.loadBooks().subscribe(books => {
      this.books = books;
      console.log(JSON.stringify(books[0]));
      this.isLoading = false;
    });
  }

  onBookClick(book: any) {
    console.log("NAVIGATING TO "+book.id);
    this.router.navigate(['/books', book.id]); // Adjust the route as per your setup
    this.bookService.openSidebar();
  }

  onNewBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
    this.bookService.openSidebar();
  }

  onNewRecipe() {
    this.router.navigate(['../recipes/new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
