import { Component, Input } from '@angular/core';
import { Book } from '../../book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  @Input() book: Book;
  @Input() index: number;

}


