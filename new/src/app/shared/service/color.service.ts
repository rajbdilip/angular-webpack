import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { ColorData }      from './../model/colordata.class';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColorService {
  constructor(private http: Http) {}
  getServices(): Promise<ColorData> {
    const dataUrl = 'mock/colors.json';
    return this.http.get(dataUrl)
               .toPromise()
               .then(response => response.json() as ColorData)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
