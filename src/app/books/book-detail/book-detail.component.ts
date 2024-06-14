import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;
  isLoading = true;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.book = this.bookService.getBookById(this.id);
      this.isLoading = false;
    });
  }
  onEditBook() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteBook() {
    console.log("deleting book "+this.book.id);
    this.bookService.deleteBook(this.book.id).subscribe();
  }


}
