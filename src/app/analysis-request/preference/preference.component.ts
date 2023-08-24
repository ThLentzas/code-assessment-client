import {Component, OnInit} from '@angular/core';
import {QualityAttribute} from './quality-attribute';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  preferences = [{
    selectedPreference: '',
    weight: null
  }];
  qualityAttributes: string[];

  ngOnInit(): void {
    this.qualityAttributes = Object.keys(QualityAttribute)
      .filter((key) => isNaN(Number(key)))
      .map((key) => key.replace(/_/g, ' '));
  }

  onAddPreference() {
    this.preferences.push({
      selectedPreference: '',
      weight: null
    });
  }

  onRemovePreference(index: number) {
    this.preferences.splice(index, 1);
  }
}
