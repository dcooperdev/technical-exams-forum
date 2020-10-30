import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  @Input() liked: boolean;
  @Output() newLike:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  like() {
    this.newLike.emit();
  }

}
