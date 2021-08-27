import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { get } from 'lodash-es';

@Injectable()
export class LocaleService {
  locale = new BehaviorSubject({});
  direction: 'rtl' | 'ltr' = 'rtl';

  constructor(
    @Optional() @Inject('baseUrlI18n') private readonly baseUrl?: string
  ) {
    this.baseUrl = this.baseUrl || 'assets/locale';
    const storedLanguage = localStorage.getItem('language') as 'en' | 'he';
    this.language = storedLanguage || 'en';
  }

  private _language: 'en' | 'he' = 'en';

  get language() {
    return this._language;
  }

  set language(value: 'en' | 'he') {
    this._language = value;
    localStorage.setItem('language', value);
    this.direction = value === 'he' ? 'rtl' : 'ltr';
    fetch(this.baseUrl + '/' + value + '.json').then(async (res) => {
      this.locale.next(await res.json());
    });
  }

  getLocaleItem(path: string) {
    return get(this.locale.value, path);
  }
}
