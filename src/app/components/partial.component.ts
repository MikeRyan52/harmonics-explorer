/*
 * Renders a particular partial of the harmonic series, including
 * its amplitude control and its sine wave curve.
 */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  animate,
  style,
  transition,
  trigger
} from '@angular/core';

@Component({
  selector: 'hs-partial',
  template: `
    <div class="control">
      <div class="control-label">
        <ng-content></ng-content>
      </div>
      <hs-gain-input [gain]="gain"
                     (gainChange)="gainChange.next($event)">
      </hs-gain-input>
    </div>
    <hs-curve [data]="curveData" [strong]=strong>
    </hs-curve>
  `,
  styles: [`
    :host {
      display: flex;
      overflow: hidden;
    }
    .control {
      flex: 2;

      display: flex;
      align-items: center;
    }
    .control .control-label {
      flex-basis: 20%;
    }
    .control hs-gain-input {
      flex-basis: 80%;
    }
    hs-curve {
      flex: 3;
    }
  `],
  animations: [
    trigger('gainChange', [
      transition('* => *', [
        style({backgroundColor: '#ddd'}),
        animate('500ms ease-out', style({backgroundColor: 'white'}))
      ])
    ])
  ],
  // This is a dumb, stateless component with immutable inputs. We can use
  // OnPush change detection.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartialComponent {
  @Input() strong = false;
  // Whenever the gain changes, the @gainChange animation is also triggered,
  // which highlights the change by flashing the background color.
  @Input() @HostBinding('@gainChange') gain: number;
  @Input() curveData: Iterable<number>;
  @Output() gainChange = new EventEmitter();
}
