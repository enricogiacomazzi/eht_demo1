import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'http'
})
export class HttpPipe implements PipeTransform {

  async transform(url: string): Promise<any> {
     const res = await fetch(url);
     const body = await res.json();
     return body;
  }

}
