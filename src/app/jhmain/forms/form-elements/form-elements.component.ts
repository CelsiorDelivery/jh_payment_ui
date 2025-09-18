// angular import
import { Component } from '@angular/core';

// project import
//import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-form-elements',
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent {}
