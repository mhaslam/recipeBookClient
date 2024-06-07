import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookStartComponent } from './book-start/book-start.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BooksComponent,
    BookStartComponent,
    BookListComponent,
    BookDetailComponent,
    BookItemComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class BooksModule { }
