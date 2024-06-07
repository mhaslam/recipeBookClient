import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  id: number;
  editMode = false;
  bookForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log("SAVING...");
    let saveObs: Observable<Book>;

    if (this.editMode) {
      //saveObs=this.bookService.updateBook(this.id, this.bookForm.value);
    } else {
      saveObs = this.bookService.addBook(this.bookForm.value);
    }


    saveObs.subscribe(
      resData => {
        console.log("SAVED: "+resData);
        //this.isLoading = false;
        this.onCancel();
      },
      errorMessage => {
        console.log(errorMessage);
        // this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        // this.isLoading = false;
      }
    );

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let title = '';
    let imageUrl = '';
    let description = '';

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      title = book.title;
      imageUrl = book.imageUrl;
      description = book.description;
    }

    this.bookForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      imageUrl: new FormControl(imageUrl),
      description: new FormControl(description)    
    });
  }
}