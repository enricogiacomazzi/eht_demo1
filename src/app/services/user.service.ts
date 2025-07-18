import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { concatWith, delay, filter, from, map, NEVER, Observable, of, switchMap, toArray } from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {
    private http = inject(HttpClient);


    public GetUsernames(): Observable<string[]> {
        return of(['Beppe', 'Pippo', 'Gino']);
    }

    public SearchUsers(name: string): Observable<any[]> {
        return this.http.get<any[]>('http://jsonplaceholder.typicode.com/users').pipe(
            switchMap(u => from(u)),
            filter(u => u.name.toUpperCase().includes(name.toUpperCase())),
            toArray()
        )
    }
}