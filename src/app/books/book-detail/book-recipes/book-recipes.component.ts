import {Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge,  of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Recipe } from '../../../recipes/recipe.model';
import { Book } from '../../book.model';


@Component({
  selector: 'app-book-recipes',
  templateUrl: './book-recipes.component.html',
  styleUrl: './book-recipes.component.css'
})
export class BookRecipesComponent implements AfterViewInit {
  @Input() book: Book;
  displayedColumns: string[] = ['image','title', 'description', 'created','createdBy'];
  data: Recipe[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.bookService.getRecipes(this.book.id,this.paginator.pageIndex,this.paginator.pageSize,this.sort.active)
          .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;
          return data.content;
        }),
      )
      .subscribe(data => {
                console.log("DATA");
                console.log(data);
                return this.data = data;
      });
  }

  onRecipeClick(recipe:Recipe){
    console.log(recipe);
  }
}



