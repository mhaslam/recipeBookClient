import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookStartComponent } from './book-start/book-start.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookRecipesComponent } from './book-detail/book-recipes/book-recipes.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookStartComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailComponent,
    BookRecipesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    RouterModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BooksModule { }
