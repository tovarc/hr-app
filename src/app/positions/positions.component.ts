import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { UIModalClassicComponent } from '../ui/modals/modal-classic.component';
import { PositionsApiService } from '../api/positions.service';
import { CreatePositionModalComponent } from './forms/create/create-position.component';
import { UpdatePositionModalComponent } from './forms/update/update-position.component';

@Component({
  selector: 'positions',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreatePositionModalComponent,
    UpdatePositionModalComponent,
  ],
  templateUrl: './positions.component.html',
})
export class PositionsComponent implements OnInit {
  private positionsApiService = inject(PositionsApiService);

  public newPositionModalIsOpen: WritableSignal<boolean> = signal(false);
  public updatePositionModalIsOpen: WritableSignal<boolean> = signal(false);

  public positions$!: Observable<any[]>;

  ngOnInit(): void {
    this.getPositions();
  }

  public getPositions() {
    this.positions$ = this.positionsApiService.getAllPositions();
  }

  public openNewPositionModal(): void {
    this.newPositionModalIsOpen.set(true);
  }

  public closeNewPositionModal(): void {
    this.newPositionModalIsOpen.set(false);
  }

  public selectedPosition: any;

  public openUpdatePositionModal(employee: any): void {
    this.selectedPosition = employee;
    this.updatePositionModalIsOpen.set(true);
  }

  public closeUpdatePositionModal(): void {
    this.updatePositionModalIsOpen.set(false);
  }

  public deletePosition(position: any) {
    this.positionsApiService.deletePosition(position).subscribe({
      complete: () => this.getPositions(),
    });
  }
}
