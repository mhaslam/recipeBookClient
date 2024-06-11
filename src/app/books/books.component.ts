import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BookService } from './book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @ViewChild('offcanvas', { static: true }) offcanvas: ElementRef;
  @ViewChild('backdrop', { static: true }) backdrop: ElementRef;

  constructor(private renderer: Renderer2, private bookService: BookService, private router: Router) {
    console.log('BooksComponent initialized');
  }

  ngOnInit(): void {
    console.log('BooksComponent ngOnInit');
    this.bookService.sidebarState$.subscribe((isOpen: boolean) => {
      console.log("Opening SIDEBAR");
      if (isOpen) {
        this.openOffcanvas();
      } else {
        this.closeOffcanvas();
      }
    });
  }

  openOffcanvas() {
    this.renderer.addClass(this.offcanvas.nativeElement, 'show');
    this.renderer.addClass(this.backdrop.nativeElement, 'show');
  }

  closeOffcanvas() {
    this.router.navigate(['/books']);
    this.renderer.removeClass(this.offcanvas.nativeElement, 'show');
    this.renderer.removeClass(this.backdrop.nativeElement, 'show');
  }
}
