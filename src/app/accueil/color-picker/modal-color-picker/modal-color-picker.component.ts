import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-color-picker',
  templateUrl: './modal-color-picker.component.html',
  styleUrls: ['./modal-color-picker.component.scss']
})
export class ModalColorPickerComponent implements OnInit {
  
  @Input() heading: string;
  @Input() color: string;
  @Output() event: EventEmitter<string> = new EventEmitter<string>();

  public show = true;

  public defaultColors: string[] = [
    '#ffffff',
    '#000105',
    '#3e6158',
    '#3f7a89',
    '#96c582',
    '#b7d5c4',
    '#bcd6e7',
    '#7c90c1',
    '#9d8594',
    '#dad0d8',
    '#4b4fce',
    '#4e0a77',
    '#a367b5',
    '#ee3e6d',
    '#d63d62',
    '#c6a670',
    '#f46600',
    '#cf0500',
    '#efabbd',
    '#8e0622',
    '#f0b89a',
    '#f0ca68',
    '#62382f',
    '#c97545',
    '#c1800b'
  ];

  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close("annuler")
  }


  /**
   * Change color from default colors
   * @param {string} color
   */
   public changeColor(color: string): void {
    this.activeModal.close(color)
  }

}
