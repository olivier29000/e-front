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
    '#808080',
    '#C0C0C0',
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
    '#c1800b',
    '#FF0000',
    '#FFFF00',
    '#808000',
    '#00FF00',
    '#008000',
    '#00FFFF',
    '#008080',
    '#0000FF',
    '#000080',
    '#FF00FF',
    '#800080',
    '#FFA500',
    '#FF00FF',
    '#9400D3',
    '#7CFC00',
    '#00FFFF',
    '#87CEFA'
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
