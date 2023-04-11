import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'pds-nebular-search-input',
  templateUrl: './nebular-search-input.component.html',
  styleUrls: ['./nebular-search-input.component.scss'],
})
export class NebularSearchInputComponent implements OnInit {
  @Input() placeholder: string = ''
  @Input() disabled: boolean = false
  @Input() required: boolean = false
  @Input() title: string = 'Buscar'
  @Input() fullWidth: boolean = false
  @Input() type: 'text' | 'number' = 'text'
  @Input() size: 'small' | 'tiny' | 'medium' | 'large' | 'giant' = 'small'
  @Input() initialValue: string | number = ''
  @Input() debounce: number = 600

  @Input() control: FormControl

  @Output() onSearch = new EventEmitter<any>()
  @Output() onButtonClick = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {
    this.control = new FormControl(
      this.initialValue,
      this.required ? Validators.required : null,
    )
    this.control.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(res => {
        this.onSearch.emit(res)
      })
  }
}
