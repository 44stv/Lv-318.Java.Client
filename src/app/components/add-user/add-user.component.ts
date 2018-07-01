import {Component, Input, OnChanges} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnChanges {

  @Input() user: User;
  email = new FormControl('', [Validators.required, Validators.email]);

  userForm: FormGroup;
  states = this.states;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.createForm();

  }

  createUser(): void {
    this.userService.createUser(this.user)
      .subscribe(data => {
        alert('User created successfully.');
      });

  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required , Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnChanges() { // <-- call rebuildForm in ngOnChanges
    this.rebuildForm();
  }

  rebuildForm() { // <-- wrap patchValue in rebuildForm
    this.userForm.reset();
  }

}

/*OnChanges {
@Input() hero: Hero;

  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      address: this.fb.group({
        street: '',
        city: '',
        state: '',
        zip: ''
      }),
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() { // <-- call rebuildForm in ngOnChanges
    this.rebuildForm();
  }

  rebuildForm() { // <-- wrap patchValue in rebuildForm
    this.heroForm.reset();
    this.heroForm.patchValue({
      name: this.hero.name
    });
  }
}*/

