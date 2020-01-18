import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey: string = 'AIzaSyAkQ6NT8dESVDqyCxkoJWNz945-kHxIa90';

  constructor(public http: HttpClient) { }

  getVideosForChanel(channel, maxResults): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet&type=video,id&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  getVideoInformation(videoId) {
    let url = 'https://www.googleapis.com/youtube/v3/videos?key=' + this.apiKey + '&id=' + videoId + '&part=statistics'
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }
}