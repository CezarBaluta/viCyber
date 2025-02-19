import { Injectable } from '@angular/core';

interface Sponsor {
  img: string
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  constructor() { }

  public sponsors: Sponsor[] = [
    {
      img: 'assets/images-new/sponsori/autonom.png',
      url: 'https://www.autonom.ro/'
    }, 
    {
      img: 'assets/images-new/sponsori/Biochem-logo.png',
      url: 'https://biochem.ro/'
    },
    {
      img: 'assets/images-new/sponsori/florian.png',
      url: 'https://deflorian.ro/ro/'
    },
    {
      img: 'assets/images-new/sponsori/gameloft.png',
      url: 'https://www.gameloft.com/'
    },
    {
      img: 'assets/images-new/sponsori/nebulox.png',
      url: 'https://www.nebulox.ro/'
    },
    {
      img: 'assets/images-new/sponsori/nuclearelectrica.png',
      url: 'https://nuclearelectrica.ro/'
    },
    {
      img: 'assets/images-new/sponsori/pop&asociatii.png',
      url: 'https://www.p-a.ro/en/'
    },
    {
      img: 'assets/images-new/sponsori/universitateaCopiilor.png',
      url: 'https://unico.org.ro/'
    },
    {
      img: 'assets/images-new/sponsori/vianu.png',
      url: 'http://portal.lbi.ro/'
    },
    {
      img: 'assets/images/emerson standard-01.png',
      url: 'https://www.emerson.com/en-us/global'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNJ9pv8GRo9YliCv7h7ifiR3DniOyGpkJug&s',
      url: 'https://www.agrafa.ro/'
    }
  ]
}
