import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TallyService {
  constructor(private http: Http) {}
  getServices(getDataUrl: any): Promise<any> {
    return this.http.get(getDataUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
