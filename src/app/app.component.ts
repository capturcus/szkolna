import { Component, ChangeDetectorRef } from '@angular/core';
import { YoutubeService } from './youtube.service';

let that;
const VIDEOS_PER_CHANNEL = 5;
let channels = [
  "UCXf8RmFdAgpIU1kUk5xoCfg", // konon
  "UC8e8Ag9Or9ra4J6jl4qjfEg", // major
  "UCKA5YAzkl3eeaA5AcFp9bQg", // mexicano
  "UCJYqfQHURFqVwLCPG6YkYCw", // pato tv
  "UCZ2r6weRqzyhOn6nKNoa0Vg", // łoś and goł
  "UC0xUCUzGbh1jzQ8YluQzY3Q", // US17
  "UC7fyntP3VUw6hmJptul1iPA", // sławek
  // "UCSGjWPIQRm1dFl2iiR52TfQ", // fiodor
  "UCZh2BKgTBOU6J9rqVwiXVDw", // szef sztabu
  "UC9cF2YC10ov1LYDmmXe9YnA", // king of the diamond
  "UCzAneqbdmvuBieWliCcTXrw", // różne filmiki reaktywacja
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'szkolna';

  // videos = [{"id":"UMKW8AzxHbY","channelTitle":"Pato TV","publishedAt":"2020-01-18T15:43:36.000Z","title":"I tak to właśnie jest ogółem"},{"id":"-qCunHUelPQ","channelTitle":"Pato TV","publishedAt":"2020-01-15T20:06:32.000Z","title":"Lajt"},{"id":"eOdVtawrizs","channelTitle":"Pato TV","publishedAt":"2020-01-14T18:01:12.000Z","title":"Takie tam"},{"id":"t8ci03VvBP8","channelTitle":"Pato TV","publishedAt":"2020-01-14T10:51:03.000Z","title":"Opowiadam wam jak jest"},{"id":"5_rJjXVP4HM","channelTitle":"Pato TV","publishedAt":"2020-01-13T18:49:08.000Z","title":"Zygzakiem przez świat"},{"id":"6sFLe7jXgFI","channelTitle":"mexicano tv","publishedAt":"2020-01-18T14:14:26.000Z","title":"Tajemnica XXI wieku Porwanie"},{"id":"jtpA8tRf4yc","channelTitle":"mexicano tv","publishedAt":"2020-01-18T10:57:24.000Z","title":"Posłuchajmy Ewy Lipton"},{"id":"OB6hpWsU6As","channelTitle":"mexicano tv","publishedAt":"2020-01-18T10:37:59.000Z","title":"A do Choroszczy tam ich"},{"id":"6CNw-xbtcGE","channelTitle":"mexicano tv","publishedAt":"2020-01-17T14:40:36.000Z","title":"Ja Olkoholik -  jak jest teraz"},{"id":"bnYqsmH19Lg","channelTitle":"mexicano tv","publishedAt":"2020-01-17T13:23:41.000Z","title":"Okiem Krzysia Rozpruwacza"},{"id":"ZcvymcMzWkQ","channelTitle":"Kononowicz Orginal","publishedAt":"2020-01-06T21:45:00.000Z","title":"LAJT BOZY!!!  Kononowicz i Major Suchodolski (LINK DO DONEJTOW W OPISIE)"},{"id":"GYFA6MxArXw","channelTitle":"Kononowicz Orginal","publishedAt":"2020-01-04T17:30:05.000Z","title":"LAJT BOZY!!!  Kononowicz i Major Suchodolski (LINK DO DONEJTOW W OPISIE)"},{"id":"WMUGCkncXoU","channelTitle":"Kononowicz Orginal","publishedAt":"2019-12-19T22:05:35.000Z","title":"LAJT BOZY!!!  Kononowicz i Major Suchodolski (LINK DO DONEJTOW W OPISIE)"},{"id":"NTAtQxJU8rQ","channelTitle":"Kononowicz Orginal","publishedAt":"2019-12-19T18:03:07.000Z","title":"LAJT BOZY!!!  Kononowicz i Major Suchodolski (LINK DO DONEJTOW W OPISIE)"},{"id":"m6-B6X3oAxw","channelTitle":"Kononowicz Orginal","publishedAt":"2019-12-19T17:59:53.000Z","title":"LAJT BOZY!!!  Kononowicz i Major Suchodolski (LINK DO DONEJTOW W OPISIE)"},{"id":"hg0Y6q2pJSA","channelTitle":"Major Suchodolski","publishedAt":"2020-01-18T13:28:52.000Z","title":"Ostatni lajt przed tarapiq (18.01.2020) LINK DO DONEJTÓW w opisie"},{"id":"A4ltwH_EsiM","channelTitle":"Major Suchodolski","publishedAt":"2020-01-18T13:14:56.000Z","title":"WŁAŚNIE SPODKAŁEM SIE Z WIDZEM SPAŃAŁM"},{"id":"dQ6NpzVM48Y","channelTitle":"Major Suchodolski","publishedAt":"2020-01-18T11:38:14.000Z","title":"JDE NA LECZENIE ZAMKNIETE MOŃKA POSTAWIŁA WARUNEK"},{"id":"vtKvuBCYuP0","channelTitle":"Major Suchodolski","publishedAt":"2020-01-18T10:48:03.000Z","title":"KTO CHCE KUPICZ MUJ SAMOCHUT U KONONA JEST"},{"id":"hrh1g0lNJdk","channelTitle":"Major Suchodolski","publishedAt":"2020-01-17T21:40:11.000Z","title":"Na dobranoc nagrałem to"}];
  videos = [];

  constructor(
    private youtube: YoutubeService,
    private changeDetector: ChangeDetectorRef
  ) {
    that = this;
  }

  processVideos() {
    this.videos.sort((a, b) => -a.publishedAt.localeCompare(b.publishedAt));
    // console.log(this.videos);
    for (let video of this.videos) {
      this.youtube.getVideoInformation(video.id)
      .subscribe((data: any) => {
        // console.log(data);
        let stats = data.items[0].statistics;
        // console.log(stats);
        video.views = stats.viewCount;
        video.licks = stats.likeCount;
        video.dislicks = stats.dislikeCount;
        video.koms = stats.commentCount;
        // console.log(video);
      });
    }
    // this.changeDetector.detectChanges();
  }

  processSearchListResponse(data: any) {
      // console.log(data);
      for (let v of data.items) {
        that.videos.push({
          "id": v.id.videoId,
          "channelTitle": v.snippet.channelTitle,
          "publishedAt": v.snippet.publishedAt,
          "title": v.snippet.title,
        });
      //   let id = v.id.videoId;
      //   this.youtube.getVideoInformation(id)
      //   .subscribe((data) => {
      //     console.log(data);
      //   })
      }
      if (that.videos.length === channels.length*VIDEOS_PER_CHANNEL) {
        that.processVideos();
      }
  }

  ngOnInit() {
    for (let ch of channels) {
      this.youtube.getVideosForChanel(ch, VIDEOS_PER_CHANNEL).subscribe(this.processSearchListResponse);
    }
    // this.processVideos();
  }
}
