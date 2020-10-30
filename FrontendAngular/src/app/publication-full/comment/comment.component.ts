import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() commented: boolean;
  @Output() newComment:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  comment(text) {
    this.newComment.emit( text );
  }

}
