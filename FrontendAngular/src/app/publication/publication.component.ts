import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../Interfaces/publication.interface';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  @Input() publication: Publication;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  likes() {
    return this.publication.likes.length;
  }

}
