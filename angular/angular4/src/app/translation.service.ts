import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { switchMap, retry, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
    ApiResponse,
    Language,
    TranslationDirection,
    WordPair,
} from "./app.interfaces";
import { translationDirectionToLanguagePair } from "./app.utils";

@Injectable({
    providedIn: "root",
})
export class TranslationService {
    private apiKey = environment.translationApiKey;
    private httpOptions = {
        response: "json",
        headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    };
    constructor(private http: HttpClient) { }

    translate(
        word: string,
        translationDirection: TranslationDirection
    ): Observable<WordPair> {
        return of(word).pipe(
            switchMap((word) =>
                this.http.get(
                    `https://api.mymemory.translated.net/get?q=${word}!&langpair=${translationDirection}`,
                    this.httpOptions
                )
            ),
            retry(2),
            map((response: ApiResponse) => {
                const languages: Language[] = translationDirectionToLanguagePair(
                    translationDirection
                );
                return {
                    added: new Date(),
                    original: {
                        spelling: word,
                        language: languages[0],
                    },
                    translation: {
                        spelling: response.responseData.translatedText,
                        language: languages[1],
                    },
                };
            })
        );
    }
}
