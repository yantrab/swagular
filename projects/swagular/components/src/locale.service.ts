import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { get } from 'lodash-es';

@Injectable()
export class LocaleService {
  locale = new BehaviorSubject(undefined);
  direction: 'rtl' | 'ltr' = 'rtl';

  constructor(
    @Optional() @Inject('baseLocaleUrl') private readonly baseUrl?: string
  ) {
    this.baseUrl = this.baseUrl || 'assets/locale';
    const storedLanguage = localStorage.getItem('language');
    this.language = storedLanguage || 'en';
  }

  private _language = 'en';

  get language() {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
    localStorage.setItem('language', value);
    this.direction = value === 'he' ? 'rtl' : 'ltr';
    fetch(this.baseUrl + '/' + value + '.json').then(async (res) => {
      this.locale.next(await res.json());
    });
  }

  async getLocaleItem(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.locale.subscribe((locale) => {
        if (locale) {
          resolve(get(locale, path));
        }
      });
    });
  }
}
