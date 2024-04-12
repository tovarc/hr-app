import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedUser: WritableSignal<any> = signal({});
  public loggedUserRole: Signal<string> = computed(
    () => this.loggedUser().role.name,
  );

  setLoggedUser(user: any): void {
    this.loggedUser.set(user);
  }
}
