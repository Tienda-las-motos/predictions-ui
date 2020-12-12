import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, Input } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Loading } from '../../loading.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'waiting-bar',
  templateUrl: './waiting-bar.component.html',
  styleUrls: ['./waiting-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingBarComponent implements OnInit {

  state$: BehaviorSubject<boolean> = new BehaviorSubject( false )
  @Input() set state(toggle: boolean) { this.state$.next(toggle); }
  get state() { return this.state$.getValue()}

  constructor(private loading: Loading) { }

  ngOnInit(): void {
    this.loading.toggleWaitingBar().subscribe( forcedState => {
      !forcedState
        ? this.state = !this.state
        : this.state = forcedState
      this.state$.next(this.state)
    })
  }

}
